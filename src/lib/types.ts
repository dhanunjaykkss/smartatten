export interface Student {
  rollNumber: number;
  name: string;
  phone: string;
}

export interface AttendanceRecord {
  studentRollNumber: number;
  date: string; // YYYY-MM-DD
  class: string;
  status: 'Present' | 'Absent';
}
