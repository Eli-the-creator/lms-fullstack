import NavbarRoutes from '@/components/NavbarRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import CourseMobileSideBar from './CourseMobileSideBar';
import Logo from '@/app/(dashbord)/_components/Logo';

interface CourseSideBarProps {
  course: Course & {
    chapter: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progress: number;
}

export default function CourseNavBar({ course, progress }: CourseSideBarProps) {
  return (
    <div className="p-5 border-b h-full flex items-center justify-between bg-slate-100 shadow-sm ">
      <span className="lg:block md:block sm:hidden hidden">
        <Logo />
      </span>
      <CourseMobileSideBar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
}
