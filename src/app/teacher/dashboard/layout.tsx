import Image from 'next/image';
import {
  BookCheck,
  LayoutDashboard,
  LogOut,
  ScanLine,
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
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: 'Dashboard' }}
                >
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
                    href={`/teacher/dashboard/attendance?name=${teacherName || ''}`}
                  >
                    <BookCheck />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: 'Summary' }}
                >
                  <Link
                    href={`/teacher/dashboard/summary?name=${teacherName || ''}`}
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
