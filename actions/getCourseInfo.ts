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

    return {
      accessUserId,
      course,
      category,
    };
  } catch (error) {
    console.error(error);
  }
}
