import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Loading() {
  return (
    <div>
      <div className="px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="w-full h-16 bg-slate-400 rounded-xl " />
          <Skeleton className="w-full h-16 bg-slate-400 rounded-xl" />
        </div>
      </div>

      <div className="w-hull px-6 mt-9">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          <Skeleton className="w-full h-80 bg-slate-400 rounded-xl" />
          <Skeleton className="w-full h-80 bg-slate-400 rounded-xl" />
          <Skeleton className="w-full h-80 bg-slate-400 rounded-xl" />
          <Skeleton className="w-full h-80 bg-slate-400 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
