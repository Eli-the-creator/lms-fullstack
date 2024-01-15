import { Menu } from 'lucide-react';

import { Course, Chapter, UserProgress } from '@prisma/client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CourseSideBar from './CourseSideBar';

interface CourseSideBarProps {
  course: Course & {
    chapter: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progress: number;
}

export default function CourseMobileSideBar({
  course,
  progress,
}: CourseSideBarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 w-72">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0" side={'left'}>
        <CourseSideBar course={course} progress={progress} />
      </SheetContent>
    </Sheet>
  );
}
