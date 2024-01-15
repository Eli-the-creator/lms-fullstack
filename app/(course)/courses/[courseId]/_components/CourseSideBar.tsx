import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { redirect } from 'next/navigation';
import CourseSideBarChapter from './CourseSideBarChapter';
import Logo from '@/app/(dashbord)/_components/Logo';
import CourseProgress from '@/components/CourseProgress';

interface CourseSideBarProps {
  course: Course & {
    chapter: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progress: number;
}

export default async function CourseSideBar({
  course,
  progress,
}: CourseSideBarProps) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  // In layout you can find my explanetion about this ts-ignore
  //
  // Just a dummy typo
  // Any way this my own project,  even this comment nobody gonna read
  //

  return (
    <div className="h-full w-72 border-r flex flex-col items-center overflow-y-scroll shadow-md bg-slate-100/40">
      {/* <h1 className="text-lg font-light">{course.title}</h1> */}
      {purchase && (
        <div className="mt-10 mb-10 w-full px-4">
          <CourseProgress variant="default" value={progress} />
        </div>
      )}
      <div className="flex flex-col w-full overflow-scroll">
        {/* @ts-ignore */}
        {course.chapter.map((el) => (
          <CourseSideBarChapter
            key={el.id}
            id={el.id}
            label={el.title}
            isCompleted={!!el.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!el.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
}
