'use client';

import { Category as CategoryPrismaClient } from '@prisma/client';
import { IconType } from 'react-icons';

import { BiCool } from 'react-icons/bi'; //advance
import { FaAppStore } from 'react-icons/fa6'; // mobile development
import { FaUserAstronaut } from 'react-icons/fa6'; // Im strong junior
import { PiBabyDuotone } from 'react-icons/pi'; //Beginner
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';

import CategoryItem from './CategoryItem';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface categoryProps {
  items: CategoryPrismaClient[];
}

const iconMap: Record<CategoryPrismaClient['name'], IconType> = {
  'Advance Web Development': BiCool,
  Beginner: PiBabyDuotone,
  Junior: IoLogoJavascript,
  'Mobile Development': FaAppStore,
  'Strong Junior': FaUserAstronaut,
  'Web Development': FaReact,
};

export default function Category({ items }: categoryProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto">
      {items.map((el) => (
        <CategoryItem key={el.id} title={el.name} icon={iconMap[el.name]} />
      ))}
    </div>
  );
}
