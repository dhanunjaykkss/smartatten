
import { NextRequest, NextResponse } from 'next/server';
import { getAttendanceForDateAndClass, getStudents } from '@/lib/data';
import type { AttendanceRecord } from '@/lib/types';
import { format } from 'date-fns';

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const className = searchParams.get('className');
    const date = searchParams.get('date');

    if (!className || !date) {
        return new NextResponse('Missing required parameters: className and date', {
            status: 400,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    const attendanceData = getAttendanceForDateAndClass(date, className);
    
    if (attendanceData.length === 0) {
      return new NextResponse(`No attendance data available for ${className} on ${date}.`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const csvData = convertToCsv(attendanceData);
    const fileName = `attendance_${className.replace(/\s+/g, '_')}_${date}.csv`;
    
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(csvData, { status: 200, headers });

  } catch (error) {
    console.error('Failed to export attendance data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
