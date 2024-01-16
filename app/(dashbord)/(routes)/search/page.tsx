import { auth } from '@clerk/nextjs';

import { SearchInput } from '@/components/SearchInput';
import Category from './_components/Category';

import { db } from '@/lib/db';
import { getCourses } from '@/actions/getCourses';
import { redirect } from 'next/navigation';
import CourseList from './_components/CourseList';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchPage {
  searchParams: { title: string; categoryId: string };
}

async function SearchPage({ searchParams }: SearchPage) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const category = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({ userId, ...searchParams });

  //
  //
  return (
    <>
      <div className="px-6 pt-6 md:hidden  md:mb-0 block">
        <SearchInput />
      </div>

      <div className="p-6 space-y-8">
        <Category items={category} />
        <CourseList items={courses} />
      </div>
    </>
  );
}

export default SearchPage;
