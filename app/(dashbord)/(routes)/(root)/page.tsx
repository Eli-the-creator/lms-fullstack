import { getDashboard } from '@/actions/getDashboard';
import { Button } from '@/components/ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import CourseList from '../search/_components/CourseList';
import { CheckCircle, Clock } from 'lucide-react';
import InfoCart from './_componnents/InfoCart';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Dashboard() {
  const { userId } = auth();

  throw new Error();

  if (!userId) {
    redirect('/');
  }

  const { completedCourse, coursesInProgress } = await getDashboard(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCart
          variant="default"
          icon={Clock}
          label="In progress"
          numberOfItem={coursesInProgress.length}
        />

        <InfoCart
          variant="success"
          icon={CheckCircle}
          label="Completed"
          numberOfItem={completedCourse.length}
        />
      </div>
      <CourseList items={[...completedCourse, ...coursesInProgress]} />
    </div>
  );
}
