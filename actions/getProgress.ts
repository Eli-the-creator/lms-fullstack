import { db } from '@/lib/db';

export async function getProgress(
  userId: string,
  courseId: string,
): Promise<number> {
  try {
    const publishChapter = await db.chapter.findMany({
      where: {
        isPublished: true,
        courseId,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterId = publishChapter.map((el) => el.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterId,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishChapter.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.error('GET PROGRESS', error);
    return 0;
  }
}
