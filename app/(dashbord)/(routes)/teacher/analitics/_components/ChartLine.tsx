'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/DatePicker';
import { filterDataByDateRange } from '@/lib/FilterDataByDataRange';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartProps {
  label: string;
  data: { date: string; sales: string }[];
}

export default function ChartSalesLine({ data, label }: ChartProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const filteredData = filterDataByDateRange(data, date);

  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader className="w-full pt-0">
        <CardTitle className="text-2xl font-medium ">{label}</CardTitle>
        <DatePicker days={date} onSelect={setDate} />
      </CardHeader>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            width={600}
            height={400}
            data={filteredData}
            margin={{ top: 10, right: 32, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              stroke={'#888888'}
              tickFormatter={(date) => date}
            />
            <YAxis stroke={'#888888'} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              fill="#8884d8"
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
