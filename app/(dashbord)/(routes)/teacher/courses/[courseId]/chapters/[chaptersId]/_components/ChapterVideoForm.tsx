'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Mux
import MuxPlayer from '@mux/mux-player-react';
//

import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Chapter, MuxData } from '@prisma/client';
import FileUpload from '@/components/FileUpload';

interface ChapterVideoProps {
  initialData: Chapter & { muxData?: MuxData | null };
  chapterId: string;
  courseId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideo = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  function toggleEditing() {
    setIsEditing((current) => !current);
  }

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        value,
      );
      toast({
        title: 'Video upload successfully',
        description: 'upload successfully',
      });
      toggleEditing();

      // Reload the page after we update
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course video
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>Add an video</span>
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <div className="flex justify-between items-center text--muted-foreground">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit video</span>
            </div>
          )}

          {isEditing && <>Cancel</>}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="w-10 h-10 text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ''} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter's video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          <p>
            Video can take few minutes to process. Refresh page if video dos't
            appear
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapterVideo;
