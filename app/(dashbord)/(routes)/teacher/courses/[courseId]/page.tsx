import IconBadge from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import TitleForm from './_components/TitleForm';
import DescriptionForm from './_components/DescriptionForm';
import ImageForm from './_components/ImageForm';
import CategoryBoxForm from './_components/CategoryBoxForm';
import PriceForm from './_components/PriceForm';
import AttachmentsForm from './_components/Attachments';
import ChaptersForm from './_components/ChaptersForm';

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

  // Find course
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapter: {
        orderBy: {
          position: 'asc',
        },
      },
      attachements: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  // Find available course category
  const categoryRaw = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  // Transform category in to the usable object
  const categoryDataForFormElement = categoryRaw.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  //
  //
  //
  if (!course) {
    return redirect('/');
  }

  const reqiureFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapter.some((chapter) => chapter.isPublished),
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
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge
              icon={LayoutDashboard}
              size={'default'}
              variant={'success'}
            />
            <h2 className="text-xl">Custom your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryBoxForm
            initialData={course}
            courseId={course.id}
            options={categoryDataForFormElement}
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge
                icon={ListChecks}
                size={'default'}
                variant={'success'}
              />
              <h2 className="text-xl">Course chapters</h2>
            </div>

            <div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge
                icon={CircleDollarSign}
                size={'default'}
                variant={'success'}
              />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} size={'default'} variant={'success'} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>

            <AttachmentsForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourdeIDpage;
