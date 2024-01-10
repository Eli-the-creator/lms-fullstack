'use client';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  initialData: { title: string };
  courseId: string;
  chapterId: string;
}

const schemaForm = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

function ChapterForm({ initialData, courseId, chapterId }: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  async function onSubmit(value: z.infer<typeof schemaForm>) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        value,
      );
      toast({
        title: 'Updated successfully',
      });
      toggleEditing();

      // Reload the page after we update course name
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>
          Chapter title
          <span className="text-muted-foreground">
            : {initialData.title || ''}
          </span>
        </p>
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing ? (
            <div className="flex justify-between items-center">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit title</span>
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div>
        {isEditing && (
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
                        className="bg-white p-4"
                        disabled={isSubmitting}
                        placeholder='e.g. "Introduction to the course" '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type={'submit'}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

export default ChapterForm;
