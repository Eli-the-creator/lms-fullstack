import { db } from '@/lib/db';
import { getProgress } from './getProgress';

interface GetCourseInfoProps {
  userId: string;
  courseId: string;
}

export default async function getCourseInfo(userId: string, courseId: string) {
  try {
    const userPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const accessUserId = userPurchase?.userId === userId;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublish: true,
      },
    });

    if (!course) {
      throw new Error('No course found');
    }

    const category = await db.category.findMany({
      where: {
        id: course.categoryId!,
      },
      orderBy: {
        name: 'asc',
      },
    });

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

    return {
      accessUserId,
      course,
      category,
      progressPercentage,
    };
  } catch (error) {
    console.error(error);
  }
}
