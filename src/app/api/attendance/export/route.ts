
import { NextRequest, NextResponse } from 'next/server';
import { getAllAttendance, getStudents } from '@/lib/data';
import type { AttendanceRecord } from '@/lib/types';
import { format, parseISO, isValid, isWithinInterval } from 'date-fns';

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
    const startDateStr = searchParams.get('startDate'); // e.g., "2024-08-01"
    const endDateStr = searchParams.get('endDate');   // e.g., "2024-08-31"
    const subject = searchParams.get('subject');     // e.g., "Mathematics–I"

    if (!startDateStr || !endDateStr) {
        return new NextResponse('Missing required parameters: startDate and endDate', {
            status: 400,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    const startDate = parseISO(startDateStr);
    const endDate = parseISO(endDateStr);

    if (!isValid(startDate) || !isValid(endDate)) {
         return new NextResponse('Invalid date format.', { status: 400 });
    }

    if (startDate > endDate) {
        return new NextResponse('Start date cannot be after end date.', { status: 400 });
    }
    
    let attendanceData = getAllAttendance();
    let fileName = `attendance_${startDateStr}_to_${endDateStr}.csv`;
    
    attendanceData = attendanceData.filter(record => {
        const recordDate = parseISO(record.date);
        return isWithinInterval(recordDate, { start: startDate, end: endDate });
    });

    if (subject && subject !== 'all') {
        attendanceData = attendanceData.filter(record => record.class === subject);
        const safeSubjectName = subject.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fileName = `attendance_${startDateStr}_to_${endDateStr}_${safeSubjectName}.csv`;
    }
    
    if (attendanceData.length === 0) {
      const subjectName = subject && subject !== 'all' ? ` for ${subject}` : '';
      const noDataMessage = `No attendance data available from ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}${subjectName}. A file with student and class info has been downloaded.`;
      
      const allStudents = getStudents();
      const headers = ['Roll Number', 'Student Name', 'Batch'];
      
      const studentRows = allStudents.map(s => 
        [s.rollNumber, `"${s.name}"`, s.batch].join(',')
      );

      const csvData = [
        `"No attendance records found for the selected criteria."`,
        `"Export Range: ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}"`,
        `"Subject: ${subject || 'All Subjects'}"`,
        ``,
        `"Student List"`,
        headers.join(','), 
        ...studentRows
      ].join('\n');

      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', 'text/csv');
      responseHeaders.set('Content-Disposition', `attachment; filename="${fileName}"`);
      responseHeaders.set('X-No-Data-Message', noDataMessage);

      return new NextResponse(csvData, { status: 200, headers: responseHeaders });
    }

    const csvData = convertToCsv(attendanceData);
    
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(csvData, { status: 200, headers });

  } catch (error) {
    console.error('Failed to export attendance data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
