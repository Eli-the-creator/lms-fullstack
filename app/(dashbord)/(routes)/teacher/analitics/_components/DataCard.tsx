import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';

interface DataCartProps {
  value: number;
  label: string;
  shouldFormat: boolean;
}

export default function DataCard({
  value,
  label,
  shouldFormat,
}: DataCartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 pb-2">
        <CardTitle
          className="text-md
         font-medium"
        >
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
}
