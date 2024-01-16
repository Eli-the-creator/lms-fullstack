'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useState } from 'react';

interface CourseEnrolButtonProps {
  courseId: string;
  price: number;
  className?: string;
}

export default function CourseEnrollButton({
  courseId,
  price,
  className,
}: CourseEnrolButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
      //
      //
      //
    } catch (error) {
      console.error(error);
      toast({
        title: 'Something went wrong :(',
        description: 'Try again or Try later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      className={cn('w-full', !!className && className)}
      size={'lg'}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
}
