import getCourseInfo from '@/actions/getCourseInfo';
import { getCourses } from '@/actions/getCourses';

//
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import CourseContentPrev from './chapter/[chapterId]/_components/CourseContentPrev';
import SocialMediaComponents from './chapter/[chapterId]/_components/SocialMediaComponents';
import EnrollComponents from './chapter/[chapterId]/_components/EnrollComponents';

interface CoursePageProps {
  params: { courseId: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { accessUserId, course, category } = await getCourseInfo(
    userId,
    params.courseId,
  );

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
          <CourseContentPrev course={course} category={category} />
        </div>

        {/*  */}
        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
          <EnrollComponents access={accessUserId} courseId={course.id} />
          <SocialMediaComponents />
        </div>
      </div>
    </div>
  );
}
