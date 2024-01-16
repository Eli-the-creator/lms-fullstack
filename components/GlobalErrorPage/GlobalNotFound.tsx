'use client';

import SupportURL from '@/components/SupportURL';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalNotFound() {
  const router = useRouter();

  function reloadPageF() {
    router.push('/');
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-medium text-red-500">
            404 Error
          </CardTitle>
          <CardDescription className="text-xl font-medium text-red-400">
            Probable we update the course and page can be available for short
            time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-light">
            If this error happen to you recently{' '}
            <span className="text-red-500 underline">
              <SupportURL label="contact us please" />
            </span>
            <span className="font-bold"> WE FIX IT 🛠️</span>
          </p>
        </CardContent>
        <CardFooter>
          <Button
            size={'lg'}
            variant={'outline'}
            className="text-xl w-full gap-x-4 py-6 bg-sky-400 hover:bg-sky-500"
            onClick={() => reloadPageF()}
          >
            <span className="text-white">Go home</span>
            <ArrowRight className="text-white" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
