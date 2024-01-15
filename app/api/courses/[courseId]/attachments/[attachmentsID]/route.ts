import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentsID: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorize user:', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorize user:', { status: 401 });
    }

    const attachment = await db.attachments.delete({
      where: {
        id: params.attachmentsID,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);

    //
    //
    //
  } catch (error) {
    console.error(error);
    return new NextResponse('DELETE_ATTACHMENTS:', { status: 500 });
  }
}
