'use client';

import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface CourseSideBarChapterProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  sectionName: string;
  isNewSection: boolean;
}

export default function CourseSideBarChapter({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
  isNewSection,
  sectionName,
}: CourseSideBarChapterProps) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  function onClick() {
    router.push(`/courses/${courseId}/chapter/${id}`);
  }

  return (
    <>
      {isNewSection && (
        <div className="bg-zinc-200 p-4 mt-6">
          <p className="font-semibold ">{sectionName}</p>
        </div>
      )}
      <button
        onClick={onClick}
        type="button"
        className={cn(
          'flex gap-x-2 border-b text-slate-500 text-sm font-[500] pl-4 transition-all hover:text-slate-600 hover:bg-slate-300/20',
          isActive &&
            'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700',
          isCompleted && 'text-emerald-700 hover:text-emerald-700',
          isCompleted && isActive && 'bg-emerald-200/20',
        )}
      >
        <div className="flex items-center w-full gap-x-2 py-6 font-[500]">
          <Icon
            size={22}
            className={cn(
              'text-slate-700',
              isActive && 'text-slate-700',
              isCompleted && 'text-emerald-700',
            )}
          />
          {label}
        </div>

        <div
          className={cn(
            ' opacity-0 border-2 border-slate-700 h-full transition-all',
            isActive && 'opacity-100 text-slate-700',
            isCompleted && 'border-emerald-700',
          )}
        />
      </button>
    </>
  );
}
