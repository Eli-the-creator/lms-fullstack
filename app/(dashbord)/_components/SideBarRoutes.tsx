'use client';

import { Layout, Compass, List, BarChart, PlusCircle } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

const guessRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Brows',
    href: '/search',
  },
];

const teacherRoute = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analitics',
    href: '/teacher/analitics',
  },
  {
    icon: PlusCircle,
    label: 'Create course',
    href: '/teacher/create',
  },
];

//
function SideBarRoutes() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');

  const routes = isTeacherPage ? teacherRoute : guessRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

export default SideBarRoutes;
