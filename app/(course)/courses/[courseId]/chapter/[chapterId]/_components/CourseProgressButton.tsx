'use client';

import { CheckCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

interface CourseProgressButton {
  courseId: string;
  chapterId: string;
  nextChapter: string;
  isCompleted: boolean;
}

export default function CourseProgressButton({
  courseId,
  nextChapter,
  chapterId,
  isCompleted,
}: CourseProgressButton) {
  const router = useRouter();
  const confetti = useConfettiStore();

  const [isLoading, setIsLoading] = useState(false);

  const Icon = isCompleted ? XCircle : CheckCircle;

  async function onClick() {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted },
      );

      if (!isCompleted && !nextChapter) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapter) {
        router.push(`/courses/${courseId}/chapter/${nextChapter}`);
      }

      toast({ title: 'Progress updated' });
      router.refresh();

      //
      //
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Try reload page or try later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }
  //
  return (
    <Button
      type="button"
      variant={isCompleted ? 'outline' : 'default'}
      disabled={isLoading}
      onClick={onClick}
      className="flex items-center gap-x-2 w-full md:w-auto"
    >
      {isCompleted ? 'Not done' : 'Complete'} <Icon className="h-6 w-6" />
    </Button>
  );
}
