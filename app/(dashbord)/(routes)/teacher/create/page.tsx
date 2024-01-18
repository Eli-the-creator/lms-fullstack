'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const formShema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

//
//
function CreatePage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formShema>) {
    try {
      const response = await axios.post('/api/courses', values);
      router.push(`/teacher/courses/${response.data.id}`);

      toast({
        title: 'Success',
        description: 'You create a new course',
      });
      //
      //
    } catch (error) {
      toast({
        title: "Something wen't wrong :(",
        description: 'Try again later, or reload the page',
        variant: 'destructive',
        action: (
          <Button
            onClick={() => location.reload()}
            className="text-foreground"
            variant={'outline'}
          >
            Reload the page
          </Button>
        ),
      });
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
      <div className="border p-8 rounded-xl shadow-md">
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-muted-foreground">
          What would you like to name your course? Dont worry, you can change
          this name later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      /* @ts-ignore */
                      disabled={isSubmitting}
                      placeholder='e.g. "Advance web development"'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant={'outline'}>
                  Cancel
                </Button>
              </Link>
              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreatePage;
