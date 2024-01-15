import { db } from '@/lib/db';
import { Category, Chapter, Course } from '@prisma/client';
import { getProgress } from './getProgress';

type courseWithProgressWithCategory = Course & {
  category: Category;
  chapter: Chapter[];
  progress: number | null;
};

type DashboardReturn = {
  completedCourse: courseWithProgressWithCategory[];
  coursesInProgress: courseWithProgressWithCategory[];
};

export async function getDashboard(userId: string): Promise<DashboardReturn> {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (el) => el.course,
    ) as courseWithProgressWithCategory[];

    for (const course of courses) {
      const progress = await getProgress(userId, course.id);
      course['progress'] = progress;
    }

    const completedCourse = courses.filter((el) => el.progress === 100);
    const coursesInProgress = courses.filter((el) => (el.progress ?? 0) < 100);

    return {
      completedCourse,
      coursesInProgress,
    };
    //
    //
    //
  } catch (error) {
    console.error(error);
    return {
      completedCourse: [],
      coursesInProgress: [],
    };
  }
}
