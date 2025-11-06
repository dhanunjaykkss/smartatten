import Image from 'next/image';
import {
  BookCheck,
  LayoutDashboard,
  LogOut,
  ScanLine,
  ShieldAlert,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/app/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Suspense } from 'react';
import { getTeacherSchedule } from '@/lib/data';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function TeacherName({ name }: { name: string | undefined }) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-sidebar-foreground">
        {name || 'Teacher'}
      </span>
      <span className="text-xs text-sidebar-foreground/70">
        Teacher Account
      </span>
    </div>
  );
}

export default function TeacherDashboardLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const teacherAvatar = PlaceHolderImages.find(
    (img) => img.id === 'teacher-avatar'
  );
  const teacherName = searchParams?.name as string | undefined;

  const today = new Date();
  const dayOfWeek = format(today, 'EEEE'); // e.g., "Monday"
  let hasClassesToday = false;
  if (teacherName) {
    const schedule = getTeacherSchedule(teacherName);
    if (schedule && schedule.schedule[dayOfWeek]?.length > 0) {
      hasClassesToday = true;
    }
  } else {
    // If no teacher name, assume they might have classes to avoid locking out.
    // The login should enforce the name.
    hasClassesToday = true;
  }

  if (!hasClassesToday) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="font-headline text-2xl text-destructive">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You do not have any classes scheduled for today. Access to the
              teacher portal is only available on days with scheduled classes.
            </p>
            <Link href="/" className="mt-6 inline-block text-sm text-primary hover:underline">
              Return to Home Page
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="hidden group-data-[collapsible=icon]:flex">
              <Logo />
            </div>
            <div className="flex w-full items-center justify-between group-data-[collapsible=icon]:hidden">
              <Logo />
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Dashboard' }}>
                  <Link href={`/teacher/dashboard?name=${teacherName || ''}`}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: 'Attendance' }}
                >
                  <Link
                    href={`/teacher/dashboard/attendance?name=${
                      teacherName || ''
                    }`}
                  >
                    <BookCheck />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Summary' }}>
                  <Link
                    href={`/teacher/dashboard/summary?name=${
                      teacherName || ''
                    }`}
                  >
                    <ScanLine />
                    <span>Summary Tool</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                {teacherAvatar && (
                  <AvatarImage
                    src={teacherAvatar.imageUrl}
                    alt={teacherAvatar.description}
                  />
                )}
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                <Suspense fallback={<div>Loading...</div>}>
                  <TeacherName name={teacherName} />
                </Suspense>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
