
import { NextRequest, NextResponse } from 'next/server';
import { getAllAttendance, getStudents } from '@/lib/data';
import type { AttendanceRecord } from '@/lib/types';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';

function convertToCsv(data: AttendanceRecord[]): string {
    const students = getStudents();
    const studentMap = new Map(students.map(s => [s.rollNumber, s.name]));

    const headers = ['Date', 'Class', 'Roll Number', 'Student Name', 'Status'];
    // Sort data by date and then by class
    const sortedData = data.sort((a, b) => {
        const dateComparison = a.date.localeCompare(b.date);
        if (dateComparison !== 0) return dateComparison;
        return a.class.localeCompare(b.class);
    });

    const rows = sortedData.map(record => [
        record.date,
        `"${record.class}"`,
        record.studentRollNumber,
        `"${studentMap.get(record.studentRollNumber) || 'Unknown'}"`,
        record.status,
    ].join(','));
    
    return [headers.join(','), ...rows].join('\n');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month'); // e.g., "2024-08"

    if (!month) {
        return new NextResponse('Missing required parameter: month', {
            status: 400,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
    
    const targetDate = parseISO(`${month}-01`);
    const startDate = startOfMonth(targetDate);
    const endDate = endOfMonth(targetDate);

    const allAttendance = getAllAttendance();
    
    const attendanceData = allAttendance.filter(record => {
        const recordDate = parseISO(record.date);
        return recordDate >= startDate && recordDate <= endDate;
    });
    
    if (attendanceData.length === 0) {
      return new NextResponse(`No attendance data available for ${format(targetDate, 'MMMM yyyy')}.`, {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const csvData = convertToCsv(attendanceData);
    const fileName = `attendance_${month.replace('-', '_')}.csv`;
    
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(csvData, { status: 200, headers });

  } catch (error) {
    console.error('Failed to export attendance data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
