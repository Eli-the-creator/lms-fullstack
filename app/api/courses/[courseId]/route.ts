import Mux from '@mux/mux-node';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { isTeacher } from '@/lib/teacher';

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
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
      return new NextResponse('Not found', { status: 404 });
    }

    // manually delete data from mux
    for (const chapter of course.chapter) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData?.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
        userId,
      },
    });

    return NextResponse.json(deletedCourse);
    //
    //
    //
  } catch (error) {
    console.log('[CHAPTER_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorize request', { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);

    //
  } catch (error) {
    console.error('[Course Update]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
