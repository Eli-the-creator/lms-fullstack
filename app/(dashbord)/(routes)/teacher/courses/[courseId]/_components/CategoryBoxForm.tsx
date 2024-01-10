'use client';
import * as z from 'zod';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Combobox } from '@/components/ui/combobox';

interface Props {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const schemaForm = z.object({
  categoryId: z.string().min(1, {}),
});

function CategoryBoxForm({ initialData, courseId, options }: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

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

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId,
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing ? (
            <div className="flex justify-between items-center text--muted-foreground">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit category</span>
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && (
          <p className="text-sm font-semibold text-muted-foreground mt-2">
            Course category:
            <span className="text-foreground italic">
              &nbsp;{selectedOption?.label || 'No category yet'}
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
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox options={options} {...field} />
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

export default CategoryBoxForm;
