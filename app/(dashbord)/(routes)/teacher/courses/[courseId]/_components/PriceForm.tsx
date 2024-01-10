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
import { Course } from '@prisma/client';
import { formatPrice } from '@/lib/format';

interface Props {
  initialData: Course;
  courseId: string;
}

const schemaForm = z.object({
  price: z.coerce.number(),
});

function PriceForm({ initialData, courseId }: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: { price: initialData?.price || undefined },
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
        Course price
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing ? (
            <div className="flex justify-between items-center text--muted-foreground">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit price</span>
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && (
          <p className="text-sm font-semibold text-muted-foreground mt-2">
            Course price:
            <span className="text-foreground">
              &nbsp;
              {initialData.price ? formatPrice(initialData.price) : 'Free'}
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
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        placeholder="How many value do you bring ?"
                        disabled={isSubmitting}
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

export default PriceForm;
