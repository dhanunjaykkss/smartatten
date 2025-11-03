import AttendanceSheet from '@/components/app/attendance-sheet';
import { getAttendanceForDateAndClass, getStudents, classes } from '@/lib/data';
import { format } from 'date-fns';

export default function AttendancePage() {
  const students = getStudents();
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');

  // Fetch initial data for today and the first class
  const initialAttendance = getAttendanceForDateAndClass(todayString, classes[0]);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Mark Attendance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select a class and date, then mark each student as present or absent.
        </p>
      </div>

      <AttendanceSheet
        students={students}
        classes={classes}
        initialAttendance={initialAttendance}
      />
    </div>
  );
}
