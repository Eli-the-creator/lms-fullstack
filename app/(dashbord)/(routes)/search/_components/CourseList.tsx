import { Category, Course } from '@prisma/client';
import CourseCart from './CourseCart';

type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CoursesWithProgressWithCategory[];
}

export default function CourseList({ items }: CourseListProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCart
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            // Just type what i don't have any forces to fix (chapters -> chapter)
            // Any way this project for my personal use
            // ...
            // Never mind i fix douse fucker
            chaptersLength={item.chapter?.length}
            price={item.price!}
            progress={item.progress!}
            category={item.category!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className=" text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
}
