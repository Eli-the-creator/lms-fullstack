import IconBadge from '@/components/IconBadge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ChapterForm from './_components/TitleForm';
import { ChapterDescriptionForm } from './_components/DescriptionForm';
import { ChapterAccessForm } from './_components/ChapterAccessForm';
import ChapterVideo from './_components/ChapterVideoForm';
import Banner from '@/components/Banner';
import { ChapterActions } from './_components/ChapterActions';
import { IsNewSection } from './_components/IsNewSection';

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chaptersId: string };
}) {
  //Authorize user check
  //
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  // Find chapter
  //
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chaptersId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  // Compleat logic here
  //
  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requireFields.length;
  const completedField = requireFields.filter(Boolean).length;

  const completionText = `(${completedField} / ${totalFields})`;
  //

  const isComplete = requireFields.every(Boolean);

  return (
    <>
      <Banner
        label={
          chapter.isPublished
            ? 'This chapter is unpublished'
            : 'This chapter is unpublished.It will not be visible in the course'
        }
        variant={chapter.isPublished ? 'success' : 'warning'}
      />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center gap-2 hover:opacity-75 mb-6"
            >
              <ArrowLeft className="h-4 w-4 hover:opacity-75 transition" />
              <span className="flex items-center gap-2 text-sm transition border-muted-foreground">
                Back to course setup
              </span>
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <p>
                  Complete all fields <span>{completionText}</span>
                </p>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chaptersId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge
                  icon={LayoutDashboard}
                  size={'default'}
                  variant={'success'}
                />
                <h2 className="text-xl">Customize course</h2>
              </div>

              <ChapterForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chaptersId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chaptersId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} size={'default'} variant={'success'} />
                <h2 className="text-xl">Access setting</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chaptersId}
              />
              <IsNewSection
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chaptersId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} variant={'success'} size={'default'} />
              <h2 className="text-xl">Video</h2>
            </div>
            <ChapterVideo
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chaptersId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
