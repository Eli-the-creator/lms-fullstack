'use client';
// spell-checker: disable

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  File,
  ImageIcon,
  Loader,
  Loader2,
  Pencil,
  PlusCircle,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Attachments, Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';
import IconBadge from '@/components/IconBadge';
import { clear } from 'console';

interface AttachmentsProps {
  initialData: Course & { attachements: Attachments[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentsForm = ({
  initialData,
  courseId,
}: AttachmentsProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [deletingID, setDeletingID] = useState<string | null>(null);

  const router = useRouter();

  function toggleEditing() {
    setIsEditing((current) => !current);
  }

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, value);
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

  async function onDelete(id: string) {
    try {
      setDeletingID(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);

      toast({ title: 'Successfully delete', description: 'File deleted' });

      router.refresh();
      //
      //
      //
    } catch (error) {
      console.error(error);
      toast({
        title: "Can't delete file",
        description: 'Try again leter',
        variant: 'destructive',
      });
    } finally {
      setDeletingID(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments & Resources
        <Button onClick={toggleEditing} variant={'ghost'}>
          {!isEditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              <span>Add a file</span>
            </>
          )}

          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {isEditing && (
        <>
          {initialData.attachements.length === 0 && (
            <p className="text-sm mt-2 text-muted-foreground">
              No attachments yet
            </p>
          )}
          {initialData.attachements.length > 0 && (
            <div className="space-y-2">
              {initialData.attachements.map((attachemt) => (
                <div
                  className="flex items-center justify-between p-3 w-full bg-sky-100 border-sku-200 border text-sky-700 rounded-md"
                  key={attachemt.id}
                >
                  <div className="flex items-center">
                    <File className="w-4 h-4 mr-2 flex-shrink-0" />
                    <p className="text-sm line-clamp-1">{attachemt.name}</p>
                  </div>

                  {deletingID === attachemt.id && (
                    <div>
                      <Loader2 className=" w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {deletingID !== attachemt.id && (
                    <button
                      onClick={() => onDelete(attachemt.id)}
                      className="bg-red-500 rounded-md p-1"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {!isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to compleat the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentsForm;
