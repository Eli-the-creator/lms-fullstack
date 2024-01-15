import IconBadge from '@/components/IconBadge';
import { LucideIcon } from 'lucide-react';

interface InfoCart {
  variant: 'default' | 'success';
  label: string;
  icon: LucideIcon;
  numberOfItem: number;
}

export default function InfoCart({
  variant,
  label,
  icon: Icon,
  numberOfItem,
}: InfoCart) {
  return (
    <div className="border rounded-md flex items-center gap-x-4 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-md">{label}</p>
        <p className="text-slate-500 text-sm font-[600]">
          {numberOfItem}
          {numberOfItem === 1 ? ' Course' : ' Courses'}
        </p>
      </div>
    </div>
  );
}
