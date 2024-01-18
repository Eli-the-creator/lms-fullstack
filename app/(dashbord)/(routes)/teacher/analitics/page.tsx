import { getAnalytics } from '@/actions/getAnalitics';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Chart from './_components/ChartLine';
import DataCard from './_components/DataCard';
import ChartSalesLine from './_components/ChartLine';
import ChartCourse from './_components/ChartCourse';
import { SalesTable } from './_components/SalesTable';
import { db } from '@/lib/db';
import { columnsSales } from './_components/SalesTableColumn';

async function AnalyticsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const course = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // TODO: type here
  // @ts-ignore
  const { data, totalRevenue, totalSale, dataBestSeller, purchasedCourses } =
    await getAnalytics(userId);

  // @ts-ignore
  const courseLastSale = purchasedCourses.map((item) => item.course);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSale} shouldFormat={false} />
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat={true}
        />

        <ChartSalesLine label="Day Revenue" data={data} />
        <ChartCourse label="Best Seller" data={dataBestSeller} />
      </div>
      <div className="w-full">
        <SalesTable data={courseLastSale} columns={columnsSales} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
