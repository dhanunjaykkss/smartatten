'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { findStudentByRollNumber, saveAttendance, getAllAttendance, getStudents, getAttendanceForDateAndClass, getTeacherSchedule } from './data';
import { summarizeAttendanceData } from '@/ai/flows/summarize-attendance-data';
import type { AttendanceRecord } from './types';
import { format } from 'date-fns';

// Teacher Login
const teacherLoginSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export async function teacherLogin(
  prevState: { message: string },
  formData: FormData
) {
  const parsed = teacherLoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { message: 'Invalid form data.' };
  }

  const { fullName, password } = parsed.data;

  const schedule = getTeacherSchedule(fullName);

  if (schedule && password === 'aua9ncrc') {
    const today = new Date();
    const dayOfWeek = format(today, 'EEEE'); // e.g., "Monday"
    const hasClassesToday = schedule.schedule[dayOfWeek]?.length > 0;

    if (hasClassesToday) {
      redirect(`/teacher/dashboard?name=${encodeURIComponent(fullName)}`);
    } else {
        // Redirect to a specific "no class" page or back to home with a message
        // For simplicity, we can redirect to a dedicated page or show a message.
        // Let's redirect to an access denied page that we will create.
        // For now, let's just return a message. A dedicated page would be better UX.
        return { message: 'You have no classes scheduled for today. Access denied.' };
    }
  }

  return { message: 'Invalid full name or password.' };
}

// Student Login
const studentLoginSchema = z.object({
  rollNumber: z.coerce.number().min(1, 'Roll number is required.'),
});

export async function studentLogin(
  prevState: { message: string },
  formData: FormData
) {
  const parsed = studentLoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return { message: 'Invalid roll number.' };
  }

  const student = findStudentByRollNumber(parsed.data.rollNumber);

  if (student) {
    redirect(`/student/dashboard?rollNumber=${student.rollNumber}`);
  }

  return { message: 'Student with this roll number not found.' };
}

// Save Attendance
export async function saveAttendanceAction(
  date: string,
  className: string,
  attendance: Record<number, 'Present' | 'Absent'>
) {
  try {
    const records = Object.entries(attendance).map(([rollNumber, status]) => ({
      studentRollNumber: parseInt(rollNumber, 10),
      status,
    }));
    saveAttendance(records, date, className);
    revalidatePath('/teacher/dashboard/attendance');
    return { success: true, message: 'Attendance saved.' };
  } catch (error) {
    return { success: false, message: 'Failed to save attendance.' };
  }
}

// Get Attendance for a specific class and date
export async function getAttendanceForDateAndClassAction(date: string, className: string) {
  try {
    const data = getAttendanceForDateAndClass(date, className);
    return { success: true, data };
  } catch (error) {
    return { success: false, message: 'Failed to fetch attendance data.' };
  }
}

// Get AI Summary
const summarySchema = z.object({
  instructions: z.string().min(1, 'Instructions are required.'),
});

function formatAttendanceDataToCsv(data: AttendanceRecord[]): string {
    const students = getStudents();
    const studentMap = new Map(students.map(s => [s.rollNumber, s.name]));

    const headers = ['date', 'class', 'rollNumber', 'studentName', 'status'];
    const rows = data.map(record => [
        record.date,
        record.class,
        record.studentRollNumber,
        studentMap.get(record.studentRollNumber) || 'Unknown',
        record.status,
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}


export async function getSummaryAction(
  prevState: { summary: string, message: string },
  formData: FormData
) {
  const parsed = summarySchema.safeParse({
    instructions: formData.get('instructions'),
  });

  if (!parsed.success) {
    return { summary: '', message: 'Invalid instructions provided.' };
  }

  try {
    const attendanceData = getAllAttendance();
    const csvData = formatAttendanceDataToCsv(attendanceData);
    
    const result = await summarizeAttendanceData({
        instructions: parsed.data.instructions,
        attendanceData: csvData,
    });

    return { summary: result.summary, message: '' };
  } catch (error) {
    console.error(error);
    return { summary: '', message: 'Failed to generate summary. Please try again.' };
  }
}
