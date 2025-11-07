
'use client';

import { getAttendanceForStudent, findStudentByRollNumber, classes as allSubjects } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';
import { Suspense, useMemo, use } from 'react';
import { Progress } from '@/components/ui/progress';
import type { AttendanceRecord } from '@/lib/types';

function StudentInfo({ rollNumber }: { rollNumber: number }) {
  const student = findStudentByRollNumber(rollNumber);

  return (
     <div className="flex flex-col">
      <span className="font-semibold text-sidebar-foreground">
        {student?.name || 'Student'}
      </span>
      <span className="text-xs text-sidebar-foreground/70">
        Roll No: {student?.rollNumber || 'N/A'}
      </span>
    </div>
  )
}

function calculateOverallAttendanceStats(attendance: AttendanceRecord[]) {
  const totalRecords = attendance.length;
  const presentRecords = attendance.filter(r => r.status === 'Present').length;
  const absentRecords = totalRecords - presentRecords;
  const attendancePercentage = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 100;

  return { totalRecords, presentRecords, absentRecords, attendancePercentage };
}


function calculateSubjectWiseStats(attendance: AttendanceRecord[]) {
    return allSubjects.map(subject => {
        const subjectRecords = attendance.filter(r => r.class === subject);
        const totalClasses = subjectRecords.length;
        const presentClasses = subjectRecords.filter(r => r.status === 'Present').length;
        const absentClasses = totalClasses - presentClasses;
        const percentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 100;

        return {
            subject,
            totalClasses,
            presentClasses,
            absentClasses,
            percentage,
        };
    });
}

function StudentDashboard({ rollNumber }: { rollNumber: number }) {
  const student = findStudentByRollNumber(rollNumber);

  if (!student) {
    redirect('/student/login');
  }
  
  const attendance = getAttendanceForStudent(rollNumber);
  const { totalRecords, presentRecords, absentRecords, attendancePercentage } = useMemo(() => calculateOverallAttendanceStats(attendance), [attendance]);
  const subjectStats = useMemo(() => calculateSubjectWiseStats(attendance), [attendance]);
  
  const attendanceByDate = useMemo(() => {
    const records = attendance.reduce((acc, record) => {
        (acc[record.date] = acc[record.date] || []).push(record);
        return acc;
    }, {} as Record<string, typeof attendance>);
    return Object.keys(records).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reduce((acc, key) => {
        acc[key] = records[key];
        return acc;
    }, {} as Record<string, typeof attendance>);
  }, [attendance]);
  const sortedDates = Object.keys(attendanceByDate);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          {student.name}'s Attendance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here is a summary and detailed record of your attendance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Overall Summary</CardTitle>
                <CardDescription>Your overall attendance statistics across all subjects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="mb-2 flex justify-between">
                        <span className="text-muted-foreground">Overall Attendance</span>
                        <span className="font-bold">{attendancePercentage}%</span>
                    </div>
                    <Progress value={attendancePercentage} aria-label={`${attendancePercentage}% attendance`} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">{totalRecords}</p>
                        <p className="text-sm text-muted-foreground">Total Classes</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">{presentRecords}</p>
                        <p className="text-sm text-muted-foreground">Present</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600">{absentRecords}</p>
                        <p className="text-sm text-muted-foreground">Absent</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Your attendance breakdown for each subject.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subjectStats.map(stat => (
                    <Card key={stat.subject} className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base font-medium">{stat.subject}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                             <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-muted-foreground">Attendance</span>
                                    <span className="font-bold">{stat.percentage}%</span>
                                </div>
                                <Progress value={stat.percentage} aria-label={`${stat.percentage}% attendance for ${stat.subject}`} />
                            </div>
                            <div className="flex justify-between text-center text-sm">
                                <div>
                                    <p className="font-bold">{stat.totalClasses}</p>
                                    <p className="text-xs text-muted-foreground">Total</p>
                                </div>
                                <div>
                                    <p className="font-bold text-green-600">{stat.presentClasses}</p>
                                    <p className="text-xs text-muted-foreground">Present</p>
                                </div>
                                <div>
                                    <p className="font-bold text-red-600">{stat.absentClasses}</p>
                                    <p className="text-xs text-muted-foreground">Absent</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Detailed History</CardTitle>
            <CardDescription>Records are sorted by the most recent date.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="max-h-[60vh] overflow-auto rounded-lg border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedDates.length > 0 ? (
                    sortedDates.flatMap(date =>
                        attendanceByDate[date].map((record, index) => (
                        <TableRow key={`${record.date}-${record.class}-${record.studentRollNumber}`}>
                            {index === 0 && (
                            <TableCell rowSpan={attendanceByDate[date].length} className="align-top font-medium">
                                {new Date(date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'UTC', // Ensure consistent date parsing
                                })}
                            </TableCell>
                            )}
                            <TableCell>{record.class}</TableCell>
                            <TableCell>
                            <Badge variant={record.status === 'Present' ? 'default' : 'destructive'}>
                                {record.status}
                            </Badge>
                            </TableCell>
                        </TableRow>
                        ))
                    )
                    ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                        No attendance records found.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function StudentDashboardPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const unwrappedSearchParams = use(searchParams);
  const rollNumberStr = unwrappedSearchParams.rollNumber as string | undefined;

  if (!rollNumberStr) {
    redirect('/student/login');
  }
  const rollNumber = parseInt(rollNumberStr, 10);
  
  if (isNaN(rollNumber)) {
    redirect('/student/login');
  }

  (StudentDashboardPage as any).info = (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentInfo rollNumber={rollNumber} />
    </Suspense>
  );

  return (
    <StudentDashboard rollNumber={rollNumber} />
  );
}

    