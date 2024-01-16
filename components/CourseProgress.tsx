import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';

interface CourseProgressProps {
  value?: number;
  variant?: 'success' | 'default';
  size?: 'sm' | 'default';
  className?: string;
}

const colorVariant = {
  default: 'text-sky-700',
  success: 'text-emerald-700',
};

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-sm',
};

export default function CourseProgress({
  value,
  variant,
  size,
  className,
}: CourseProgressProps) {
  return (
    <div className="w-full">
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          'font-medium mt-2 text-sky-700',
          colorVariant[variant || 'default'],
          sizeByVariant[size || 'default'],
          className,
        )}
      >
        {Math.round(value!)}% Complete
      </p>
    </div>
  );
}
