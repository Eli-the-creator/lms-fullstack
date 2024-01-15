import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from './_components/DataTable';
import { columns } from './_components/Columns';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

async function CoursesPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={course} />
    </div>
  );
}

// <Link href="/teacher/create">
//   <Button className="p-6">New Course</Button>
// </Link>
export default CoursesPage;
