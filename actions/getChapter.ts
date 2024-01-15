import { db } from '@/lib/db';
import {
  Attachments,
  Chapter,
  Course,
  MuxData,
  Purchase,
  UserProgress,
} from '@prisma/client';

interface GetChapterProps {
  courseId: string;
  chapterId: string;
  userId: string | null;
}

export async function getChapter({
  chapterId,
  courseId,
  userId,
}: GetChapterProps) {
  try {
    if (!userId) {
      throw new Error('Unauthorize or course is not existing');
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublish: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error('No course or chapter find');
    }

    let muxData = null;
    let attachments: Attachments[] = [];
    let nextChapter: Chapter | null = null;

    // Load attachment if we buy this course
    //
    //
    if (purchase) {
      attachments = await db.attachments.findMany({
        where: {
          courseId,
        },
      });
    }

    // Load video and the next chapter if we buy this course OR video is Free
    //
    // muxData in schema have a typo "Chapret !!!!!!!!!!!!!!!!!!!!!!!!!
    //
    if (purchase || chapter?.isFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapretId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          chapterId,
          userId,
        },
      },
    });

    return {
      course,
      chapter,
      muxData,
      purchase,
      attachments,
      nextChapter,
      userProgress,
    };

    //
    //
    //
  } catch (error) {
    console.error('ERROR in getChapter:', error);
    return {
      chapterId: null,
      courseId: null,
      userId: null,
      muxData: null,
    };
  }
}
