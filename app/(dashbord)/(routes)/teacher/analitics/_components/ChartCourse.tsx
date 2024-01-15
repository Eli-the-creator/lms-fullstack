'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartBestSellerProps {
  label: string;
  data: { name: string; total: string }[];
}

export default function ChartCourse({ label, data }: ChartBestSellerProps) {
  return (
    <Card>
      <CardHeader className="pb-12">
        <CardTitle className="text-2xl font-medium">{label}</CardTitle>
        <p className="text-muted-foreground">Here is your best sellers </p>
      </CardHeader>
      <div className="w-full">
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              width={600}
              height={400}
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
            >
              <XAxis dataKey={'name'} stroke={'#888888'} fontSize={16} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
              />

              <Tooltip />
              <Bar dataKey={'total'} fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
}
