import { getChapter } from '@/actions/getChapter';
import Banner from '@/components/Banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import VideoPlayer from './_components/VideoPlayer';
import CourseEnrollButton from './_components/CourseEnrollButton';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/preview';
import { File } from 'lucide-react';
import CourseProgress from '@/components/CourseProgress';
import CourseProgressButton from './_components/CourseProgressButton';

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect('/');
  }

  const isLocked = !chapter.isFree && !purchase;
  const completedOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className="h-full w-full">
      {userProgress?.isCompleted && (
        <Banner
          label="You already completed this chapter"
          variant={'success'}
        />
      )}
      {isLocked && (
        <Banner
          variant={'warning'}
          label="This chapter is locked buy the course to unlocked them"
        />
      )}

      <div className="flex flex-col pl-12 pr-12 pt-4">
        <div className="aspect-video m-6">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapter={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completed={completedOnEnd}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 m-6">
          <h2 className="text-2xl font-semibold">{chapter.title}</h2>
          <div>
            {purchase ? (
              <CourseProgressButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                nextChapter={nextChapter?.id!}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
        </div>
        <div className="border-2 p-4 rounded-xl mx-4">
          {!isLocked && <Preview description={chapter.description!} />}
        </div>
        <div className="">
          {!!attachments.length && (
            <>
              <div className="pt-4 mx-6">
                {attachments.map((el) => (
                  <a
                    key={el.id}
                    href={el.url}
                    target="_blank"
                    className="flex items-center rounded-full w-full p-4 gap-x-4 bg-sky-200 text-sly-700 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1 ">{el.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-20" />
      </div>
    </div>
  );
}
