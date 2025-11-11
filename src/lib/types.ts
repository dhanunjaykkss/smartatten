export interface Student {
  rollNumber: number;
  name: string;
  phone: string;
  batch: 'CSE-SS-13' | 'CSE-SS-14';
}

export interface AttendanceRecord {
  studentRollNumber: number;
  date: string; // YYYY-MM-DD
  class: string;
  status: 'Present' | 'Absent';
}

export interface TeacherSchedule {
  teacherName: string;
  schedule: {
    [dayOfWeek: string]: string[]; // dayOfWeek: "Sunday", "Monday", ...
  };
}
