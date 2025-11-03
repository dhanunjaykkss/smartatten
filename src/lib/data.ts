import type { Student, AttendanceRecord, TeacherSchedule } from './types';

// Generate student data
const students: Student[] = [];
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Anika", "Diya", "Saanvi", "Aadhya", "Myra", "Aarohi", "Anvi", "Siya", "Ishita", "Pari"];
const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Patel", "Kumar", "Das", "Shah", "Reddy", "Joshi"];

for (let i = 463; i <= 536; i++) {
  students.push({
    rollNumber: i,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    phone: `+91 9${String(i).padStart(2, '0')}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`
  });
}

export const getStudents = (): Student[] => students;

export const findStudentByRollNumber = (rollNumber: number): Student | undefined => {
  return students.find(s => s.rollNumber === rollNumber);
};

export const classes = [
  "Algebra II",
  "World History",
  "AP Chemistry",
  "English Literature",
  "Physics I",
  "Computer Science",
  "Studio Art"
];

// In-memory store for attendance
let attendanceLog: AttendanceRecord[] = [];

// Pre-populate with some fake data for the summary tool
if (typeof window === 'undefined') { // Run only on server to avoid multiple runs
  const today = new Date();
  const datesToPopulate = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });
  
  datesToPopulate.forEach(date => {
    classes.forEach(className => {
      students.forEach(student => {
        attendanceLog.push({
          studentRollNumber: student.rollNumber,
          date,
          class: className,
          status: Math.random() > 0.1 ? 'Present' : 'Absent'
        });
      });
    });
  });
}

const teacherSchedules: TeacherSchedule[] = [
  {
    teacherName: 'Jane Doe',
    schedule: {
      Monday: ['Algebra II', 'AP Chemistry'],
      Tuesday: ['World History', 'Physics I'],
      Wednesday: ['Algebra II', 'Computer Science'],
      Thursday: ['World History', 'Studio Art'],
      Friday: ['AP Chemistry', 'English Literature'],
      Saturday: [],
      Sunday: [],
    },
  },
];

export const getTeacherSchedule = (teacherName: string): TeacherSchedule | undefined => {
  return teacherSchedules.find(s => s.teacherName === teacherName);
};


export const getAttendanceForDateAndClass = (date: string, className: string): AttendanceRecord[] => {
  return attendanceLog.filter(record => record.date === date && record.class === className);
};

export const getAttendanceForStudent = (rollNumber: number): AttendanceRecord[] => {
  return attendanceLog.filter(record => record.studentRollNumber === rollNumber);
};

export const getAllAttendance = (): AttendanceRecord[] => attendanceLog;

export const saveAttendance = (records: { studentRollNumber: number; status: 'Present' | 'Absent' }[], date: string, className: string) => {
  // Remove old records for the same date and class to avoid duplicates
  attendanceLog = attendanceLog.filter(r => !(r.date === date && r.class === className));
  
  // Add new records
  const newRecords: AttendanceRecord[] = records.map(r => ({
    ...r,
    date,
    class: className,
  }));

  attendanceLog.push(...newRecords);
};
