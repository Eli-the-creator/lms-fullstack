import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    courseId: string;
  };
}

async function CourdeIDpage({ params }: Props) {
  const { courseId } = params;

  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return redirect('/');
  }

  return <div></div>;
}

export default CourdeIDpage;
