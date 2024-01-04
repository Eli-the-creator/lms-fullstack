import IconBadge from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import TitleForm from './_components/TitleForm';

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

  const reqiureFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = reqiureFields.length;
  const completedFields = reqiureFields.filter(Boolean).length;

  const completedText = `( ${completedFields} / ${totalFields} )`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-muted-foreground">
            Complete all fields {completedText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="flex items-center gap-x-2">
          <IconBadge
            icon={LayoutDashboard}
            size={'default'}
            variant={'success'}
          />
          <h2 className="text-xl">Custom your course</h2>
        </div>
        <TitleForm initialData={course} courseId={course.id} />
      </div>
    </div>
  );
}

export default CourdeIDpage;
