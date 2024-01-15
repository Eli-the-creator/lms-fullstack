'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Course } from '@prisma/client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0');
      const formattedPrice = new Intl.NumberFormat('pl-PL', {
        currency: 'PLN',
        style: 'currency',
      }).format(price);

      return <div>{formattedPrice}</div>;
    },
  },
  {
    accessorKey: 'isPublish',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue('isPublish') || false;

      return (
        <Badge className={cn('bg-slate-500', isPublished && 'bg-primary')}>
          {isPublished ? 'Published' : 'Draft'}
        </Badge>
      );
    },
  },
  {
    header: 'Menu',
    id: 'action',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'} className="w-4 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem className="gap-x-2">
                <Pencil className="w-4 h-4" />
                Edit course
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
