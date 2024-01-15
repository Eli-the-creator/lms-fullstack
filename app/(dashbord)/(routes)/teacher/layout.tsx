import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

//
// Layout Protection for /teacher/...
//
export default function teacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!isTeacher(userId)) {
    redirect('/');
  }

  return <div>{children}</div>;
}
