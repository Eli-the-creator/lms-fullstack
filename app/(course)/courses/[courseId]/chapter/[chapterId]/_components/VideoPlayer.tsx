'use client';

import axios from 'axios';
import MuxPlayer from '@mux/mux-player-react';
import { useState } from 'react';
import { Toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import { toast } from '@/components/ui/use-toast';

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapter?: string;
  playbackId: string;
  isLocked: boolean;
  completed: boolean;
}

export default function VideoPlayer({
  chapterId,
  title,
  courseId,
  nextChapter,
  playbackId,
  isLocked,
  completed,
}: VideoPlayerProps) {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [isReady, setIsReady] = useState(false);

  async function onVideoEnd() {
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: true,
        },
      );

      if (!nextChapter) {
        confetti.onOpen();
      }

      router.refresh();

      if (nextChapter) {
        router.push(`/courses/${courseId}/chapter/${nextChapter}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Can't update complete status",
        description: 'Try reload the page or try later',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-xl">
          <Loader2 className="h-12 w-12 text-secondary animate-spin" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 rounded-xl">
          <Lock className="h-12 w-12 text-secondary mb-4" />
          <p className="text-secondary">
            This chapter is locked buy the course to unlocked them
          </p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={'rounded-xl border-[1rem] border-black '}
          onCanPlay={() => setIsReady(true)}
          onEnded={onVideoEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
}
