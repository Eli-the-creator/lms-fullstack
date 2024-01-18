'use client';

import SupportURL from '@/components/SupportURL';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function ErrorPage() {
  function reloadPageF() {
    location.reload();
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-4xl font-medium text-red-500">
            Error occur
          </CardTitle>
          <CardDescription className="text-xl font-medium text-red-300">
            <span>Try reload the page or try later</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">
            Dont worry, probably we just update course and this error despair
            soon
          </p>
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
            <span className="text-white">Reload page</span>
            <ReloadIcon className="animate-spin" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
