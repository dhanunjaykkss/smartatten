import { getAttendanceForStudent, findStudentByRollNumber } from '@/lib/data';
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

export default function StudentDashboardPage({ searchParams }: { searchParams: { rollNumber?: string } }) {
  const rollNumberStr = searchParams.rollNumber;
  if (!rollNumberStr) {
    redirect('/student/login');
  }

  const rollNumber = parseInt(rollNumberStr, 10);
  const student = findStudentByRollNumber(rollNumber);
  const attendance = getAttendanceForStudent(rollNumber);

  if (!student) {
    redirect('/student/login');
  }

  const attendanceByDate = attendance.reduce((acc, record) => {
    (acc[record.date] = acc[record.date] || []).push(record);
    return acc;
  }, {} as Record<string, typeof attendance>);

  const sortedDates = Object.keys(attendanceByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());


  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          {student.name}'s Attendance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here is your attendance record across all classes.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>Records are sorted by the most recent date.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border">
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
                      <TableRow key={`${record.date}-${record.class}`}>
                        {index === 0 && (
                          <TableCell rowSpan={attendanceByDate[date].length} className="align-top font-medium">
                            {new Date(date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
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
  );
}
