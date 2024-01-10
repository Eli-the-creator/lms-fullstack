import { AlertTriangle, CheckCheckIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const bannerOptions = cva(
  'border text-center p-4 text-sm flex items-center w-full gap-x-4',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-200/80 border-yellow-30 text-foreground',
        success: 'bg-emerald-700 border-emerald-800 text-secondary',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  },
);

interface BannerProps extends VariantProps<typeof bannerOptions> {
  label: string;
}

export default function Banner({ label, variant }: BannerProps) {
  //
  const iconMap = {
    warning: AlertTriangle,
    success: CheckCheckIcon,
  };

  const Icon = iconMap[variant || 'warning'];

  return (
    <div className={cn(bannerOptions({ variant }))}>
      <Icon className="w-4 h-4" />
      {label}
    </div>
  );
}
