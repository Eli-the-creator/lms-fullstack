'use client';

import axios from 'axios';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { toast } from '@/components/ui/use-toast';
import { useConfettiStore } from '@/hooks/useConfettiStore';

interface CourseActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseAction = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast({ title: 'Course unpublished' });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({ title: 'Course published' });
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast({ title: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast({ title: 'Course deleted' });
      router.push(`/teacher/courses`);
      router.refresh();
    } catch {
      toast({
        title: 'Something go wrong :(',
        description: 'Try reload the page or again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'icon'} variant={'destructive'} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
