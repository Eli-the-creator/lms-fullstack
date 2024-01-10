'use client';

import ConfirmModal from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chaptersId: string;
  isPublish: boolean;
}

export default function ChapterActions({
  disabled,
  courseId,
  chaptersId,
  isPublish,
}: ChapterActionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapter/${chaptersId}}`);

      toast({
        title: 'Chapter deleted',
        description: 'This chapter is deleted successfully',
      });

      router.refresh();
      router.push(`/teacher/courses/${courseId}}`);
      //
      //
    } catch (error) {
      toast({
        title: 'Something go wrong :(',
        description: 'Try reload the page, or try later',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled || isLoading} onClick={() => {}}>
        {isPublish ? 'Publish' : 'Unpublish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant={'destructive'} size={'icon'}>
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  );
}
