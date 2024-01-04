'use client';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface Props {
  initialData: { title: string };
  courseId: string;
}

const shemaForm = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

function TitleForm({ initialData, courseId }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof shemaForm>>({
    resolver: zodResolver(shemaForm),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  function onSubmit(value: z.infer<typeof shemaForm>) {
    console.log(value);
  }

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit title</span>
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div>
        {isEditing && (
          <p className="text-sm font-semibold text-muted-foreground mt-2">
            Course title :{' '}
            <span className="text-foreground">{initialData.title}</span>
          </p>
        )}
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
                        placeholder='e.g. "Advance web development" '
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

export default TitleForm;
