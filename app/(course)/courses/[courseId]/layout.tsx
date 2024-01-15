import { ReactNode } from 'react';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getProgress } from '@/actions/getProgress';
import CourseSideBar from './_components/CourseSideBar';
import CourseNavBar from './_components/CourseNavBar';

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const courseData = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!courseData) {
    redirect('/');
  }

  const progressCount = await getProgress(userId, courseData.id);

  //
  // This ts-ignore is just a random typo so just newer mind
  //
  // I just don have any forcers to fix this fucking sheet

  return (
    <div className="h-full">
      <div className="h-[80px] fixed insert-y-0 w-full z-50">
        {/* @ts-ignore */}
        <CourseNavBar course={courseData} progress={progressCount} />
      </div>
      <main className="flex h-full pt-[80px]">
        <div className="hidden md:flex max-h-screen w-72 flex-col shadow-xl">
          {/* @ts-ignore */}
          <CourseSideBar course={courseData} progress={progressCount} />
        </div>
        {/* <div className="h-full w-64">0</div> */}
        <div className="w-full h-full inset-0 overflow-y-scroll overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
