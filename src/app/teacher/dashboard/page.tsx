
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookCheck, ScanLine, FileDown, CalendarClock } from 'lucide-react';
import { Suspense } from 'react';
import ExportAttendanceDialog from '@/components/app/export-attendance-dialog';
import { getTeacherSchedule } from '@/lib/data';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function WelcomeMessage({ name }: { name: string | undefined }) {
  return (
    <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
      Welcome back, {name || 'Teacher'}!
    </h1>
  );
}

function TodaysSchedule({ name }: { name: string | undefined }) {
  const today = new Date();
  const dayOfWeek = format(today, 'EEEE');
  const schedule = name ? getTeacherSchedule(name) : undefined;
  const todayClasses = schedule?.schedule[dayOfWeek] || [];

  return (
     <Card className="flex flex-col lg:col-span-3">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
                <CardTitle className="font-headline text-2xl">
                    Today's Schedule ({dayOfWeek})
                </CardTitle>
                <CardDescription>
                    Your scheduled classes for today.
                </CardDescription>
            </div>
            <CalendarClock className="h-8 w-8 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {todayClasses.length > 0 ? (
             <div className="overflow-auto rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Class Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todayClasses.map((className, index) => (
                            <TableRow key={index}>
                                <TableCell>{className}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </div>
          ) : (
            <p className="text-muted-foreground">You have no classes scheduled for today.</p>
          )}
        </CardContent>
      </Card>
  )
}

export default function TeacherDashboardPage({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const { name } = searchParams;
  const today = new Date();
  const schedule = name ? getTeacherSchedule(name) : undefined;
  
  // Get all unique classes from the schedule
  const allTeacherClasses = schedule 
    ? [...new Set(Object.values(schedule.schedule).flat())]
    : [];

  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <Suspense fallback={<div className="h-10 w-64 animate-pulse rounded-md bg-muted" />}>
            <WelcomeMessage name={name} />
          </Suspense>
          <p className="mt-2 text-muted-foreground">
            Here's what you can do today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TodaysSchedule name={name} />

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">
                    Take Attendance
                  </CardTitle>
                  <CardDescription>
                    Mark daily attendance for your classes.
                  </CardDescription>
                </div>
                <BookCheck className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Select a class and date to quickly and easily record which students are present or absent.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild>
                <Link href={`/teacher/dashboard/attendance?name=${name || ''}`}>
                  Go to Attendance <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

           <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">
                    Export Attendance
                  </CardTitle>
                  <CardDescription>
                    Download attendance data.
                  </CardDescription>
                </div>
                <FileDown className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Export records for a specific day, or a full month for a selected subject or all subjects.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <ExportAttendanceDialog classes={allTeacherClasses} />
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">
                    Attendance Summary
                  </CardTitle>
                  <CardDescription>
                    Use AI to get insights from attendance data.
                  </CardDescription>
                </div>
                <ScanLine className="h-8 w-8 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Provide instructions to summarize attendance records for specific date ranges, classes, or students.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild variant="secondary">
                <Link href={`/teacher/dashboard/summary?name=${name || ''}`}>
                  Use Summary Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

