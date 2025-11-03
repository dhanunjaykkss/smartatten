
import Image from 'next/image';
import {
  LogOut,
  User,
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
import { findStudentByRollNumber } from '@/lib/data';
import { Suspense } from 'react';

function StudentInfo({ rollNumber }: { rollNumber: number | undefined }) {
  const student = rollNumber ? findStudentByRollNumber(rollNumber) : null;

  return (
     <div className="flex flex-col">
      <span className="font-semibold text-sidebar-foreground">
        {student?.name || 'Student'}
      </span>
      <span className="text-xs text-sidebar-foreground/70">
        Roll No: {student?.rollNumber || 'N/A'}
      </span>
    </div>
  )
}


export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const studentAvatar = PlaceHolderImages.find(
    (img) => img.id === 'student-avatar'
  );
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="none">
          <SidebarHeader>
            <div className="flex w-full items-center justify-between">
              <Logo />
            </div>
          </SidebarHeader>
          <SidebarContent>
            {/* Can add more menu items here if needed in the future */}
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
                {studentAvatar && (
                  <AvatarImage
                    src={studentAvatar.imageUrl}
                    alt={studentAvatar.description}
                  />
                )}
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                {children}
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
