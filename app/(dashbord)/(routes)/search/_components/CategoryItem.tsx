'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { IconType } from 'react-icons';

interface CategoryItemProps {
  title: string;
  value?: string;
  icon: IconType;
}

export default function CategoryItem({
  title,
  icon: Icon,
  value,
}: CategoryItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearchId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const isSelected = currentSearchId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center py-2 px-3 gap-x-2 text-sm border rounded-full  shadow-sm border-slate-200 hover:shadow-md transition',
        isSelected && 'border-slate-200 bg-slate-300 shadow-md ring-2',
      )}
    >
      {Icon && <Icon />}
      <div className="truncate">{title}</div>
    </button>
  );
}
