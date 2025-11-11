import type { Student, AttendanceRecord, TeacherSchedule } from './types';

// Generate student data
const students: Student[] = [
  { rollNumber: 463, name: 'N Gnaneswar Rao', batch: 'CSE-SS-13' },
  { rollNumber: 464, name: 'Ravi Krishna Siripuram', batch: 'CSE-SS-13' },
  { rollNumber: 465, name: 'M Kinshuk Kamal Mohit', batch: 'CSE-SS-13' },
  { rollNumber: 466, name: 'Likith Katru', batch: 'CSE-SS-13' },
  { rollNumber: 467, name: 'A Rudra Aditya', batch: 'CSE-SS-13' },
  { rollNumber: 468, name: 'S Namrata', batch: 'CSE-SS-13' },
  { rollNumber: 469, name: 'Donipudi Jagan Mohan', batch: 'CSE-SS-13' },
  { rollNumber: 470, name: 'Munakala Mohan Sai Reddy', batch: 'CSE-SS-13' },
  { rollNumber: 471, name: 'P Mohith Siddhartha', batch: 'CSE-SS-13' },
  { rollNumber: 472, name: 'Unknown 1', batch: 'CSE-SS-13' },
  { rollNumber: 473, name: 'Ch Kiran Reddy', batch: 'CSE-SS-13' },
  { rollNumber: 474, name: 'Y P Shashwath', batch: 'CSE-SS-13' },
  { rollNumber: 475, name: 'G Asrith Sai', batch: 'CSE-SS-13' },
  { rollNumber: 476, name: 'Saladi Brahma Teja', batch: 'CSE-SS-13' },
  { rollNumber: 477, name: 'M Ishita', batch: 'CSE-SS-13' },
  { rollNumber: 478, name: 'Juvvala Sai Sanjith', batch: 'CSE-SS-13' },
  { rollNumber: 479, name: 'Unknown 2', batch: 'CSE-SS-13' },
  { rollNumber: 480, name: 'Unknown 3', batch: 'CSE-SS-13' },
  { rollNumber: 481, name: 'T Jaisai', batch: 'CSE-SS-13' },
  { rollNumber: 482, name: 'V Mohit', batch: 'CSE-SS-13' },
  { rollNumber: 483, name: 'P Meenakshi', batch: 'CSE-SS-13' },
  { rollNumber: 484, name: 'Unknown 4', batch: 'CSE-SS-13' },
  { rollNumber: 485, name: 'Madhupada Manish Adithya Naidu', batch: 'CSE-SS-13' },
  { rollNumber: 486, name: 'J Karthikeya', batch: 'CSE-SS-13' },
  { rollNumber: 487, name: 'Deepak Kasi', batch: 'CSE-SS-13' },
  { rollNumber: 488, name: 'Unknown 5', batch: 'CSE-SS-13' },
  { rollNumber: 489, name: 'Unknown 6', batch: 'CSE-SS-13' },
  { rollNumber: 490, name: 'G Ramyaraju', batch: 'CSE-SS-13' },
  { rollNumber: 491, name: 'V Venkata Sandeep', batch: 'CSE-SS-13' },
  { rollNumber: 492, name: 'Shashanth Alamuru', batch: 'CSE-SS-13' },
  { rollNumber: 493, name: 'P G D S Harsha Vardhan', batch: 'CSE-SS-13' },
  { rollNumber: 494, name: 'Swayansh Padhi', batch: 'CSE-SS-13' },
  { rollNumber: 495, name: 'Pilla Satyateja', batch: 'CSE-SS-13' },
  { rollNumber: 496, name: 'N Reshma', batch: 'CSE-SS-13' },
  { rollNumber: 497, name: 'Kelli Charan Sai', batch: 'CSE-SS-13' },
  { rollNumber: 498, name: 'B Sai Varshini', batch: 'CSE-SS-13' },
  { rollNumber: 499, name: 'R Rani Angel', batch: 'CSE-SS-13' },
  { rollNumber: 500, name: 'Bhumika Sharma', batch: 'CSE-SS-14' },
  { rollNumber: 501, name: 'Kada Amruta Varshini', batch: 'CSE-SS-14' },
  { rollNumber: 502, name: 'K Bhanu Nihita Sri', batch: 'CSE-SS-14' },
  { rollNumber: 503, name: 'J Uha', batch: 'CSE-SS-14' },
  { rollNumber: 504, name: 'Domadula Omkar', batch: 'CSE-SS-14' },
  { rollNumber: 505, name: 'V Bhargavi', batch: 'CSE-SS-14' },
  { rollNumber: 506, name: 'T.C', batch: 'CSE-SS-14' },
  { rollNumber: 507, name: 'Mahapatruni Giridhar', batch: 'CSE-SS-14' },
  { rollNumber: 508, name: 'Chinta Jayavardhan Naidu', batch: 'CSE-SS-14' },
  { rollNumber: 509, name: 'Ravi teja', batch: 'CSE-SS-14' },
  { rollNumber: 510, name: 'S Gnanadeep Surya Tarak', batch: 'CSE-SS-14' },
  { rollNumber: 511, name: 'M Toran Vidya Sagar', batch: 'CSE-SS-14' },
  { rollNumber: 512, name: 'P Yogitha', batch: 'CSE-SS-14' },
  { rollNumber: 514, name: 'Sandhya V', batch: 'CSESS-14' },
  { rollNumber: 515, name: 'M Charishma', batch: 'CSE-SS-14' },
  { rollNumber: 516, name: 'P V N D Dhanunjay Reddy', batch: 'CSE-SS-14' },
  { rollNumber: 517, name: 'K Mohan Vamsi', batch: 'CSE-SS-14' },
  { rollNumber: 518, name: 'Deekala Akhil Viswas', batch: 'CSE-SS-14' },
  { rollNumber: 519, name: 'Ejji Pranay Sai Manikanta', batch: 'CSE-SS-14' },
  { rollNumber: 520, name: 'Soma Srikar Chintapalli', batch: 'CSE-SS-14' },
  { rollNumber: 521, name: 'A S Sai Sagar', batch: 'CSE-SS-14' },
  { rollNumber: 522, name: 'ISKM Yaswanth Raj', batch: 'CSE-SS-14' },
  { rollNumber: 523, name: 'S Akhilesh Krishna', batch: 'CSE-SS-14' },
  { rollNumber: 524, name: 'Pala Rahul Vardhan', batch: 'CSE-SS-14' },
  { rollNumber: 525, name: 'G Rohit Kumar', batch: 'CSE-SS-14' },
  { rollNumber: 526, name: 'G Pranav Sri Sai', batch: 'CSE-SS-14' },
  { rollNumber: 527, name: 'Indala Yaswanth Kumar', batch: 'CSE-SS-14' },
  { rollNumber: 528, name: 'Unknown 7', batch: 'CSE-SS-14' },
  { rollNumber: 529, name: 'S Siril', batch: 'CSE-SS-14' },
  { rollNumber: 530, name: 'Ambugam Vasanth Rao', batch: 'CSE-SS-14' },
  { rollNumber: 531, name: 'Rishab', batch: 'CSE-SS-14' },
  { rollNumber: 532, name: 'Kowshik Gollapalli', batch: 'CSE-SS-14' },
  { rollNumber: 533, name: 'B Harsha Vardhan', batch: 'CSE-SS-14' },
  { rollNumber: 534, name: 'S Samuel Preetham', batch: 'CSE-SS-14' },
  { rollNumber: 535, name: 'B Vaishnavi', batch: 'CSE-SS-14' },
  { rollNumber: 536, name: 'V Vasantha', batch: 'CSE-SS-14' },
].map(s => ({
    ...s,
    phone: `+91 9${String(s.rollNumber).padStart(2, '0')}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`
}));


export const getStudents = (): Student[] => students;

export const findStudentByRollNumber = (rollNumber: number): Student | undefined => {
  return students.find(s => s.rollNumber === rollNumber);
};

export const classes = [
    "C Programming Lab (CSE-SS-13)",
    "C Programming Lab (CSE-SS-14)",
    "Computer Engineering Workshop (CSE-SS-13)",
    "Computer Engineering Workshop (CSE-SS-14)",
    "Computer Programming Using C",
    "IT Essentials",
    "Communication Skills Lab (CSE-SS-13)",
    "Communication Skills Lab (CSE-SS-14)",
    "English",
    "Mathematics–I",
    "Green Chemistry",
];

const teacherSchedules: TeacherSchedule[] = [
  {
    teacherName: 'ms nillema',
    schedule: {
        Monday: [
            "C Programming Lab (CSE-SS-13)",
            "Computer Engineering Workshop (CSE-SS-14)",
        ],
        Tuesday: [
            "Computer Programming Using C",
            "IT Essentials",
        ],
        Wednesday: [
            "Communication Skills Lab (CSE-SS-13)",
            "C Programming Lab (CSE-SS-14)",
        ],
        Thursday: [
            "English",
            "IT Essentials",
            "Computer Programming Using C",
        ],
        Friday: [
            "Mathematics–I",
            "Green Chemistry",
            "Computer Engineering Workshop (CSE-SS-13)",
            "Communication Skills Lab (CSE-SS-14)",
        ],
        Saturday: [
            "Green Chemistry",
            "Mathematics–I"
        ],
        Sunday: [],
    },
  },
];

export const getTeacherSchedule = (teacherName: string): TeacherSchedule | undefined => {
  // In a real app, you'd find the schedule for the specific teacher.
  // For this demo, we'll return the first schedule for any teacher.
  return teacherSchedules.find(s => s.teacherName === teacherName) || teacherSchedules[0];
};

// In-memory store for attendance
let attendanceLog: AttendanceRecord[] = [];

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
