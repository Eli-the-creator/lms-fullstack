'use client';

import { UserButton, useAuth } from '@clerk/nextjs';
import { isTeacher } from '@/lib/teacher';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './SearchInput';

function NavbarRoutes() {
  // Privet route protection
  const { userId } = useAuth();

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.includes('/courses');
  const isSearchPage = pathname === '/search';

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button>
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size={'sm'} variant={'ghost'}>
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}

export default NavbarRoutes;
