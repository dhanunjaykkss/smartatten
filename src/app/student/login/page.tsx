import StudentLoginForm from '@/components/app/student-login-form';
import Logo from '@/components/app/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function StudentLoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-3xl">
              Student Portal
            </CardTitle>
            <CardDescription>
              Enter your roll number to view your attendance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentLoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
