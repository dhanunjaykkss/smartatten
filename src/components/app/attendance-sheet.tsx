'use client';

import { useState, useTransition, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Student, AttendanceRecord } from '@/lib/types';
import { saveAttendanceAction, getAttendanceForDateAndClassAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Info } from 'lucide-react';


type AttendanceStatus = 'Present' | 'Absent';

export default function AttendanceSheet({
  students,
  classes,
  initialAttendance,
  initialClass,
}: {
  students: Student[];
  classes: string[];
  initialAttendance: AttendanceRecord[];
  initialClass: string;
}) {
  const [date] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>(initialClass);
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [isPending, startTransition] = useTransition();
  const [isFetching, startFetchingTransition] = useTransition();
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    if (selectedClass.includes('(CSE-SS-13)')) {
      return students.filter(s => s.batch === 'CSE-SS-13');
    }
    if (selectedClass.includes('(CSE-SS-14)')) {
      return students.filter(s => s.batch === 'CSE-SS-14');
    }
    return students;
  }, [selectedClass, students]);

  const populateAttendance = useCallback((records: AttendanceRecord[]) => {
    const newStatus: Record<number, AttendanceStatus> = {};
    filteredStudents.forEach(student => {
      const record = records.find(r => r.studentRollNumber === student.rollNumber);
      newStatus[student.rollNumber] = record?.status || 'Present';
    });
    setAttendance(newStatus);
  }, [filteredStudents]);

  useEffect(() => {
    startFetchingTransition(async () => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const result = await getAttendanceForDateAndClassAction(formattedDate, selectedClass);
        if (result.success && result.data) {
            populateAttendance(result.data);
        } else {
            populateAttendance([]);
        }
    });
  }, [selectedClass, populateAttendance, date]);

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
  }

  const handleAttendanceChange = (rollNumber: number, status: boolean) => {
    setAttendance(prev => ({ ...prev, [rollNumber]: status ? 'Present' : 'Absent' }));
  };
  
  const handleSaveAttendance = async () => {
    if (!selectedClass) {
        toast({
          variant: 'destructive',
          title: 'No Class Selected',
          description: 'Please select a class to save attendance.',
        });
        return;
    }
    startTransition(async () => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const result = await saveAttendanceAction(
        formattedDate,
        selectedClass,
        attendance
      );

      if (result.success) {
        toast({
          title: 'Attendance Saved',
          description: `Attendance for ${selectedClass} on ${formattedDate} has been saved successfully.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  if (!isToday) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Attendance Controls</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Attendance Not Available</AlertTitle>
                    <AlertDescription>
                        Attendance can only be taken for the current day.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
  }
  
  if (classes.length === 0) {
      return (
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Attendance</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>No Classes Today</AlertTitle>
                    <AlertDescription>
                        You have no classes scheduled for today.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
      )
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>Attendance Controls</CardTitle>
        <CardDescription>
            You can only take attendance for your classes scheduled today, <strong>{format(date, 'PPP')}</strong>.
        </CardDescription>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                disabled
                className={cn(
                  'w-full justify-start text-left font-normal md:w-[280px]',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                disabled
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedClass} onValueChange={handleClassChange}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(c => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSaveAttendance} disabled={isPending || isFetching} className="md:ml-auto">
            {isPending ? <Loader2 className="animate-spin" /> : 'Save Attendance'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-auto rounded-lg border">
           {isFetching && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Status (Present/Absent)</TableHead>
                <TableHead className="text-right">Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.rollNumber}>
                  <TableCell className="font-medium">{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`status-${student.rollNumber}`} className="text-muted-foreground">Absent</Label>
                      <Switch
                        id={`status-${student.rollNumber}`}
                        checked={attendance[student.rollNumber] === 'Present'}
                        onCheckedChange={(checked) => handleAttendanceChange(student.rollNumber, checked)}
                        aria-label={`Mark ${student.name} as present or absent`}
                      />
                      <Label htmlFor={`status-${student.rollNumber}`} className="font-medium text-foreground">Present</Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {attendance[student.rollNumber] === 'Present' ? (
                        <span className='font-medium text-green-600'>Present</span>
                    ) : (
                        <span className='font-medium text-red-600'>Absent</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
