import AttendanceSheet from '@/components/app/attendance-sheet';
import { getAttendanceForDateAndClass, getStudents, getTeacherSchedule } from '@/lib/data';
import { format } from 'date-fns';

export default function AttendancePage({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const teacherName = searchParams.name;
  const students = getStudents();
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const dayOfWeek = format(today, 'EEEE'); // e.g., "Monday"

  let teacherClasses: string[] = [];
  if (teacherName) {
    const schedule = getTeacherSchedule(teacherName);
    if (schedule) {
      teacherClasses = schedule.schedule[dayOfWeek] || [];
    }
  }

  // Fetch initial data for today and the first class in the schedule
  const initialClass = teacherClasses.length > 0 ? teacherClasses[0] : '';
  const initialAttendance = getAttendanceForDateAndClass(todayString, initialClass);

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Mark Attendance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select a class for today and mark each student's attendance.
        </p>
      </div>

      <AttendanceSheet
        students={students}
        classes={teacherClasses}
        initialAttendance={initialAttendance}
        initialClass={initialClass}
      />
    </div>
  );
}
