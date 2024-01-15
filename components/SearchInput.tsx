'use client';

import { SearchIcon } from 'lucide-react';

import { useDebounce } from '@/hooks/useDebounce';
import { Input } from './ui/input';

import qs from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchInput() {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 250);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <SearchIcon className="w-4 h-4 absolute md:top-2 sm:top-[10px] left-3 text-muted-foreground" />

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] md:h-8 pl-9 text-xs rounded-full
      bg-slate-100 focus-visible:ring-slate-300"
        placeholder="Search for course"
      />
    </div>
  );
}
