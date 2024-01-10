'use client';

import { toast } from './ui/use-toast';

import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter } from '@/app/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export default function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log('Files: ', res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
        toast({
          title: 'Something went wrong',
          description: `Error: ${error?.message}`,
          variant: 'destructive',
        });
      }}
    />
  );
}
