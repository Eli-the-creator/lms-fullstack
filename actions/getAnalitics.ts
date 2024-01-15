import { db } from '@/lib/db';
import { Course, Purchase } from '@prisma/client';
import { NextResponse } from 'next/server';
import { format } from 'date-fns';

type PurchaseWithCourse = Purchase & {
  course: Course;
};

type SaleData = {
  date: string;
  sales: number;
};

type BestSellerData = {
  name: string;
  total: number;
};

interface AnalyticsData {
  data: SaleData[];
  totalRevenue: number;
  totalSale: number;
  dataBestSeller: BestSellerData[];
}

function groupeByCourse(purchase: PurchaseWithCourse[]) {
  const grouped: { [courseId: string]: number } = {};

  purchase.forEach((el) => {
    const courseTitle = el.course.title;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }

    grouped[courseTitle] += el.course.price!;
  });

  return grouped;
}

function groupByDay(purchases: PurchaseWithCourse[]) {
  const grouped: { [day: string]: number } = {};

  purchases.forEach((purchase) => {
    const purchaseDay = format(new Date(purchase.createdAt), 'yyyy-MM-dd');

    if (!grouped[purchaseDay]) {
      grouped[purchaseDay] = 0;
    }

    grouped[purchaseDay] += purchase.course.price!;
  });

  return grouped;
}
// helper function to fix data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return `${day < 9 ? `0${day}` : day} ${month}`;
};

export async function getAnalytics(
  userId: string,
): Promise<AnalyticsData | NextResponse> {
  //
  //
  //
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByDay(purchasedCourses);
    const bestSellerFilterByTitle = groupeByCourse(purchasedCourses);

    const saleData: SaleData[] = Object.entries(groupedEarnings).map(
      ([day, total]) => ({
        date: formatDate(day),
        sales: total,
      }),
    );

    const dataBestSeller: BestSellerData[] = Object.entries(
      bestSellerFilterByTitle,
    ).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    const totalRevenue = saleData.reduce((acc, curr) => acc + curr.sales, 0);
    const totalSale = purchasedCourses.length;

    return {
      data: saleData,
      totalRevenue,
      totalSale,
      dataBestSeller,
      purchasedCourses,
    };
  } catch (error) {
    console.error('Get analytics error: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
