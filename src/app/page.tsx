import Link from 'next/link';
import { ArrowRight, BookUser, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/app/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <Logo />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to ClassMate
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
                <BookUser className="h-6 w-6 text-primary" />
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
                <GraduationCap className="h-6 w-6 text-accent" />
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
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassMate. All rights reserved.</p>
      </footer>
    </main>
  );
}
