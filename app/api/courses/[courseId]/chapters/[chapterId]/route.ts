import Mux from '@mux/mux-node';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

///////////////////////////////
import { db } from '@/lib/db';

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

///////////////////////////////
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    //
    // check if we have same mux data in DB if so replace with a new one
    //
    if (values.videoUrl) {
      // Check
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapretId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      // Upload to Mux
      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: 'public',
        test: false,
      });

      // !!!!!!!!!!!!! change fuking chapret in Schema
      //
      await db.muxData.create({
        data: {
          chapretId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[COURSES_CHAPTER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

///////////////////////////////
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();
    const value = await req.json();

    if (!userId) {
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

    //
    //
    //
  } catch (error) {
    console.error(error);
    return new NextResponse('INTERNAL ERROR:', { status: 500 });
  }
}
