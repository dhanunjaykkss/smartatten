import type { Student, AttendanceRecord, TeacherSchedule } from './types';

// Generate student data
const students: Student[] = [
  { rollNumber: 463, name: 'N Gnaneswar Rao' },
  { rollNumber: 464, name: 'Ravi Krishna Siripuram' },
  { rollNumber: 465, name: 'M Kinshuk Kamal Mohit' },
  { rollNumber: 466, name: 'Likith Katru' },
  { rollNumber: 467, name: 'A Rudra Aditya' },
  { rollNumber: 468, name: 'S Namrata' },
  { rollNumber: 469, name: 'Donipudi Jagan Mohan' },
  { rollNumber: 470, name: 'Munakala Mohan Sai Reddy' },
  { rollNumber: 471, name: 'P Mohith Siddhartha' },
  { rollNumber: 472, name: 'Unknown 1' },
  { rollNumber: 473, name: 'Ch Kiran Reddy' },
  { rollNumber: 474, name: 'Y P Shashwath' },
  { rollNumber: 475, name: 'G Asrith Sai' },
  { rollNumber: 476, name: 'Saladi Brahma Teja' },
  { rollNumber: 477, name: 'M Ishita' },
  { rollNumber: 478, name: 'Juvvala Sai Sanjith' },
  { rollNumber: 479, name: 'Unknown 2' },
  { rollNumber: 480, name: 'Unknown 3' },
  { rollNumber: 481, name: 'T Jaisai' },
  { rollNumber: 482, name: 'V Mohit' },
  { rollNumber: 483, name: 'P Meenakshi' },
  { rollNumber: 484, name: 'Unknown 4' },
  { rollNumber: 485, name: 'Madhupada Manish Adithya Naidu' },
  { rollNumber: 486, name: 'J Karthikeya' },
  { rollNumber: 487, name: 'Deepak Kasi' },
  { rollNumber: 488, name: 'Unknown 5' },
  { rollNumber: 489, name: 'Unknown 6' },
  { rollNumber: 490, name: 'G Ramyaraju' },
  { rollNumber: 491, name: 'V Venkata Sandeep' },
  { rollNumber: 492, name: 'Shashanth Alamuru' },
  { rollNumber: 493, name: 'P G D S Harsha Vardhan' },
  { rollNumber: 494, name: 'Swayansh Padhi' },
  { rollNumber: 495, name: 'Pilla Satyateja' },
  { rollNumber: 496, name: 'N Reshma' },
  { rollNumber: 497, name: 'Kelli Charan Sai' },
  { rollNumber: 498, name: 'B Sai Varshini' },
  { rollNumber: 499, name: 'R Rani Angel' },
  { rollNumber: 500, name: 'Bhumika Sharma' },
  { rollNumber: 501, name: 'Kada Amruta Varshini' },
  { rollNumber: 502, name: 'K Bhanu Nihita Sri' },
  { rollNumber: 503, name: 'J Uha' },
  { rollNumber: 504, name: 'Domadula Omkar' },
  { rollNumber: 505, name: 'V Bhargavi' },
  { rollNumber: 506, name: 'T.C' },
  { rollNumber: 507, name: 'Mahapatruni Giridhar' },
  { rollNumber: 508, name: 'Chinta Jayavardhan Naidu' },
  { rollNumber: 509, name: 'Ravi teja' },
  { rollNumber: 510, name: 'S Gnanadeep Surya Tarak' },
  { rollNumber: 511, name: 'M Toran Vidya Sagar' },
  { rollNumber: 512, name: 'P Yogitha' },
  { rollNumber: 514, name: 'Sandhya V' },
  { rollNumber: 515, name: 'M Charishma' },
  { rollNumber: 516, name: 'P V N D Dhanunjay Reddy' },
  { rollNumber: 517, name: 'K Mohan Vamsi' },
  { rollNumber: 518, name: 'Deekala Akhil Viswas' },
  { rollNumber: 519, name: 'Ejji Pranay Sai Manikanta' },
  { rollNumber: 520, name: 'Soma Srikar Chintapalli' },
  { rollNumber: 521, name: 'A S Sai Sagar' },
  { rollNumber: 522, name: 'ISKM Yaswanth Raj' },
  { rollNumber: 523, name: 'S Akhilesh Krishna' },
  { rollNumber: 524, name: 'Pala Rahul Vardhan' },
  { rollNumber: 525, name: 'G Rohit Kumar' },
  { rollNumber: 526, name: 'G Pranav Sri Sai' },
  { rollNumber: 527, name: 'Indala Yaswanth Kumar' },
  { rollNumber: 528, name: 'Unknown 7' },
  { rollNumber: 529, name: 'S Siril' },
  { rollNumber: 530, name: 'Ambugam Vasanth Rao' },
  { rollNumber: 531, name: 'Rishab' },
  { rollNumber: 532, name: 'Kowshik Gollapalli' },
  { rollNumber: 533, name: 'B Harsha Vardhan' },
  { rollNumber: 534, name: 'S Samuel Preetham' },
  { rollNumber: 535, name: 'B Vaishnavi' },
  { rollNumber: 536, name: 'V Vasantha' },
].map(s => ({
    ...s,
    phone: `+91 9${String(s.rollNumber).padStart(2, '0')}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`
}));


export const getStudents = (): Student[] => students;

export const findStudentByRollNumber = (rollNumber: number): Student | undefined => {
  return students.find(s => s.rollNumber === rollNumber);
};

export const classes = [
    "C Programming Lab",
    "Computer Engineering Workshop",
    "Computer Programming Using C",
    "IT Essentials",
    "Communication Skills Lab",
    "English",
    "Mathematics–I",
    "Green Chemistry",
];

const teacherSchedules: TeacherSchedule[] = [
  {
    teacherName: 'ms nillema',
    schedule: {
        Monday: [
            "C Programming Lab",
            "Computer Engineering Workshop",
        ],
        Tuesday: [
            "Computer Programming Using C",
            "IT Essentials",
        ],
        Wednesday: [
            "Communication Skills Lab",
            "C Programming Lab",
        ],
        Thursday: [
            "English",
            "IT Essentials",
            "Computer Programming Using C",
        ],
        Friday: [
            "Mathematics–I",
            "Green Chemistry",
            "Computer Engineering Workshop",
            "Communication Skills Lab",
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
