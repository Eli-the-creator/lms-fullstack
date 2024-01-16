import IconBadge from '@/components/IconBadge';
import { BookOpen } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Category as PrismaCategory, Course } from '@prisma/client';
import Category from '@/app/(dashbord)/(routes)/search/_components/Category';
import Image from 'next/image';
import { Suspense } from 'react';
import { Progress } from '@/components/ui/progress';
import CourseProgress from '@/components/CourseProgress';

interface CourseContentPrevProps {
  course: Course;
  category: PrismaCategory[];
  progress: number;
}

export default function CourseContentPrev({
  course,
  category,
  progress,
}: CourseContentPrevProps) {
  const { id, title, description, imageUrl, categoryId } = course;

  return (
    <>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
        <Suspense
          fallback={
            <Skeleton className="relative aspect-video border rounded-md overflow-hidden bg-slate-900" />
          }
        >
          <Image fill src={imageUrl!} alt={`Course image ${title}`} />
        </Suspense>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='className="font-semibold text-xl md:text-2xl capitalize'>
            <div className="flex justify-between items-center">
              {title}
              <Category items={category} />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-md mb-4">
            <p>{description}</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <CourseProgress value={progress} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
