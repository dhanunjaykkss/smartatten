import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TimetableDisplay from '@/components/app/timetable-display';

function TeacherIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_teacher_icon)">
        <rect x="4" width="40" height="40" rx="12" fill="hsl(var(--primary-foreground))" />
        <rect x="4.5" y="0.5" width="39" height="39" rx="11.5" stroke="hsl(var(--border))" />
      </g>
      <g clipPath="url(#clip0_teacher_icon)">
        <path
          d="M24 28C27.3137 28 30 25.3137 30 22C30 18.6863 27.3137 16 24 16C20.6863 16 18 18.6863 18 22C18 25.3137 20.6863 28 24 28Z"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 10V12"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 32V34"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.6599 14.34L30.2399 15.76"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.7599 28.24L16.3399 29.66"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 22H32"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 22H14"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.6599 29.66L30.2399 28.24"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.7599 15.76L16.3399 14.34"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_teacher_icon"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_1"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_teacher_icon">
          <rect x="10" y="6" width="28" height="28" rx="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_student_icon)">
        <rect x="4" width="40" height="40" rx="12" fill="hsl(var(--primary-foreground))" />
         <rect x="4.5" y="0.5" width="39" height="39" rx="11.5" stroke="hsl(var(--border))" />
      </g>
      <g clipPath="url(#clip0_student_icon)">
        <path
          d="M20 29V14.5L28 10V23.5"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 29L15 26.5"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 23.5L33 26.5"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 34L15 29V19"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 19V29L24 34"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_student_icon"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_1"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_student_icon">
          <rect x="10" y="6" width="28" height="28" rx="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="container relative flex h-full flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to SmartAtten
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Streamlining classroom management. Log in to your dedicated portal to
          get started.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TeacherIcon />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">
                  Teacher Portal
                </CardTitle>
                <CardDescription>
                  Manage attendance and get insights.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Access your dashboard to take attendance, view student records,
              and generate summaries.
            </p>
            <Button asChild className="w-full">
              <Link href="/teacher/login">
                Teacher Login
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <StudentIcon />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">
                  Student Portal
                </CardTitle>
                <CardDescription>Check your attendance records.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Log in with your roll number to view your attendance history and
              stay on track.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/student/login">
                Student Login
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 w-full max-w-7xl">
        <TimetableDisplay />
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SmartAtten. All rights reserved.</p>
      </footer>
    </div>
  );
}
