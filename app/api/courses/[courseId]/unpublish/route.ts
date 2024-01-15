import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs';
import { RedirectUrl } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorize:', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse('Not found:', { status: 404 });
    }

    const unpublishCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublish: false,
      },
    });

    return NextResponse.json(unpublishCourse);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal ERROR', { status: 500 });
  }
}
