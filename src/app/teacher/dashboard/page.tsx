
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookCheck, ScanLine, FileDown } from 'lucide-react';
import { Suspense } from 'react';
import ExportAttendanceDialog from '@/components/app/export-attendance-dialog';
import { getTeacherSchedule } from '@/lib/data';
import { format } from 'date-fns';

function WelcomeMessage({ name }: { name: string | undefined }) {
  return (
    <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
      Welcome back, {name || 'Teacher'}!
    </h1>
  );
}

export default function TeacherDashboardPage({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const { name } = searchParams;
  const today = new Date();
  const dayOfWeek = format(today, 'EEEE');
  const schedule = name ? getTeacherSchedule(name) : undefined;
  const todayClasses = schedule?.schedule[dayOfWeek] || [];

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
                    Download a CSV file for a specific class.
                  </CardDescription>
                </div>
                <FileDown className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                Select one of your classes for today to download the attendance sheet as a CSV file.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <ExportAttendanceDialog classes={todayClasses} />
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
