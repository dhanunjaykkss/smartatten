'use client';

import { useState, useTransition, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Loader2, X } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Student, AttendanceRecord } from '@/lib/types';
import { saveAttendanceAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

type AttendanceStatus = 'Present' | 'Absent';

export default function AttendanceSheet({
  students,
  classes,
  initialAttendance,
}: {
  students: Student[];
  classes: string[];
  initialAttendance: AttendanceRecord[];
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]);
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    // When initial attendance data is loaded, populate the state
    const initialStatus: Record<number, AttendanceStatus> = {};
    students.forEach(student => {
      const record = initialAttendance.find(r => r.studentRollNumber === student.rollNumber);
      initialStatus[student.rollNumber] = record?.status || 'Present';
    });
    setAttendance(initialStatus);
  }, [initialAttendance, students]);

  const handleAttendanceChange = (rollNumber: number, status: boolean) => {
    setAttendance(prev => ({ ...prev, [rollNumber]: status ? 'Present' : 'Absent' }));
  };
  
  const handleSaveAttendance = async () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>Attendance Controls</CardTitle>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
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
                onSelect={(day) => day && setDate(day)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedClass} onValueChange={setSelectedClass}>
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
          <Button onClick={handleSaveAttendance} disabled={isPending} className="md:ml-auto">
            {isPending ? <Loader2 className="animate-spin" /> : 'Save Attendance'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.rollNumber}>
                  <TableCell className="font-medium">{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
