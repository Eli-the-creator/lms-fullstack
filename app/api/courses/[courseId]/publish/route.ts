import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// Unfinieshed course publish

// Lets build delete first

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse('Unauthorize:', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse('Not found:', { status: 404 });
    }

    // At list one chapter has to be published
    const hasPublishedChapter = course.chapter.some(
      (cha) => cha.isPublished === true,
    );

    if (
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !hasPublishedChapter ||
      !course.imageUrl
    ) {
      return new NextResponse(
        'Required field not validate properly or missing',
        {
          status: 401,
        },
      );
    }

    const publishCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublish: true,
      },
    });

    return NextResponse.json(publishCourse);
    //
    //
    //
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal ERROR:', { status: 500 });
  }
}
