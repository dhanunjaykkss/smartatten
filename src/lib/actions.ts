'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { findStudentByRollNumber, saveAttendance, getAllAttendance, getStudents, getAttendanceForDateAndClass } from './data';
import { summarizeAttendanceData } from '@/ai/flows/summarize-attendance-data';
import type { AttendanceRecord } from './types';

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

  if (password === 'aua9ncrc') {
    redirect(`/teacher/dashboard?name=${encodeURIComponent(fullName)}`);
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
