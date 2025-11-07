
import { NextRequest, NextResponse } from 'next/server';
import { getAllAttendance, getStudents } from '@/lib/data';
import type { AttendanceRecord } from '@/lib/types';

function convertToCsv(data: AttendanceRecord[]): string {
    const students = getStudents();
    const studentMap = new Map(students.map(s => [s.rollNumber, s.name]));

    const headers = ['Date', 'Class', 'Roll Number', 'Student Name', 'Status'];
    const rows = data.map(record => [
        record.date,
        record.class,
        record.studentRollNumber,
        `"${studentMap.get(record.studentRollNumber) || 'Unknown'}"`,
        record.status,
    ].join(','));
    
    return [headers.join(','), ...rows].join('\n');
}

export function GET(req: NextRequest) {
  try {
    const attendanceData = getAllAttendance();
    
    if (attendanceData.length === 0) {
      return new NextResponse('No attendance data available to export.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const csvData = convertToCsv(attendanceData);
    
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', 'attachment; filename="attendance_export.csv"');

    return new NextResponse(csvData, { status: 200, headers });

  } catch (error) {
    console.error('Failed to export attendance data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
