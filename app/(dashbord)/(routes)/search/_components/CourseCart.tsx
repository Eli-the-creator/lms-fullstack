import CourseProgress from '@/components/CourseProgress';
import IconBadge from '@/components/IconBadge';
import { formatPrice } from '@/lib/format';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCartProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number;
  category: { id: string; name: string };
}

export default function CourseCart({
  id,
  title,
  imageUrl,
  category,
  price,
  progress,
  chaptersLength,
}: CourseCartProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-md transition overflow-hidden border rounded-md p-3 h-full">
        <div className="relative aspect-video w-full rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={'title'} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category.name}</p>
        </div>

        <div className="my-3 flex items-center gap-x-2 text-sm text-slate-500">
          <span>
            <IconBadge icon={BookOpen} size={'sm'} variant={'default'} />
          </span>
          <p className="text-xs">
            {chaptersLength.toString()}
            {chaptersLength === 1 ? ' Chapter' : ' Chapters'}
          </p>
        </div>

        {progress !== null ? (
          <CourseProgress
            value={progress}
            variant={progress === 100 ? 'success' : 'default'}
          />
        ) : (
          <p className="text-md md:text-sm font-medium">{formatPrice(price)}</p>
        )}
      </div>
    </Link>
  );
}
