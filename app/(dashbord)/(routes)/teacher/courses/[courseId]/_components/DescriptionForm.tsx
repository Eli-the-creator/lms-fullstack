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
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@prisma/client';

interface Props {
  initialData: Course;
  courseId: string;
}

const schemaForm = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
});

function DescriptionForm({ initialData, courseId }: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: { description: initialData?.description || '' },
  });

  const { isSubmitting, isValid } = form.formState;

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  async function onSubmit(value: z.infer<typeof schemaForm>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, value);
      toast({
        description: 'Updated successfully',
      });
      toggleEditing();

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

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing ? (
            <div className="flex justify-between items-center text--muted-foreground">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit description</span>
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && (
          <p className="text-sm font-semibold text-muted-foreground mt-2">
            Course description:
            <span className="text-foreground">
              &nbsp;{initialData.description || 'No description yet'}
            </span>
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="bg-white p-4"
                        disabled={isSubmitting}
                        placeholder='e.g. "This course is about..." '
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

export default DescriptionForm;
