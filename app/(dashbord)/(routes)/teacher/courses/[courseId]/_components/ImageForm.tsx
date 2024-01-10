'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { Suspense, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';
import { shimmer, toBase64 } from '@/lib/images';

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  function toggleEditing() {
    setIsEditing((current) => !current);
  }

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, value);
      toast({
        description: 'Updated successfully',
      });
      toggleEditing();

      // Reload the page after we update
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
        Course Image
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>Add an image</span>
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <div className="flex justify-between items-center text--muted-foreground">
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit image</span>
            </div>
          )}

          {isEditing && <>Cancel</>}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="w-10 h-10 text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload image"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(600, 300),
              )}`}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ration recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
