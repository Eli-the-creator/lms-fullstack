'use client';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';

import { Course, Chapter } from '@prisma/client';
import ChaptersList from './ChaptersList';

interface Props {
  initialData: Course & { chapter: Chapter[] };
  courseId: string;
}

const schemaForm = z.object({
  title: z.string().min(1),
});

function ChaptersForm({ initialData, courseId }: Props) {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function toggleCreating() {
    setIsCreating((current) => !current);
  }

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(value: z.infer<typeof schemaForm>) {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, value);
      toast({
        description: 'Chapter create',
      });
      toggleCreating();

      // Reload the page after we update course name
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  async function onReorder(updateData: { id: string; position: number }[]) {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });

      toast({
        title: 'Chapter reordered',
        description: 'Successfully reorder chapters',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: "Can't move item",
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  async function onEdit(id: string) {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4 z-30">
      {isUpdating && (
        <div className="absolute flex items-center rounded-md top-0 right-0 justify-center w-full h-full bg-slate-500/50 z-20">
          <Loader2 className="animate-spin text-white z-10" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        <div className="flex items-center ">Course chapters</div>

        <Button onClick={toggleCreating} variant={'ghost'}>
          {!isCreating ? (
            <div className="flex justify-between items-center text--muted-foreground">
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Edit chapters</span>
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      <div>
        {isCreating && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g Introduction to the course"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type={'submit'}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        )}
        {!isCreating && (
          <div
            className={cn(
              'text-sm mt-1',
              !initialData.chapter.length && 'text-slate-500 italic',
            )}
          >
            {!initialData.chapter.length ? 'No chapters' : ''}
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapter || []}
            />
          </div>
        )}

        {!isCreating && (
          <p className="text-sm text-muted-foreground mt-2">
            Drag & drop to reorder the chapters
          </p>
        )}
      </div>
    </div>
  );
}

export default ChaptersForm;
