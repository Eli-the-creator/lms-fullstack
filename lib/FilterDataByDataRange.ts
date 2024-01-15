import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface FilterDataByDateRange {
  data: { date: string; sales: string }[];
  dateRange?: DateRange | undefined;
}

export const filterDataByDateRange = (
  data: FilterDataByDateRange['data'],
  dateRange: FilterDataByDateRange['dateRange'],
) => {
  //
  //
  // Scenario wen user don't pick date on calendar
  if (dateRange === undefined) {
    return data;
  }

  const { from, to } = dateRange;

  // ter data in to a new Set for fast searching
  const dataSet = new Set(data.map((item) => item.date));

  // filter data in (dataRange)
  const filteredData = [];

  //
  let currentDate = from;
  // @ts-ignore
  while (currentDate <= to) {
    // @ts-ignore
    const currentDateStr = format(currentDate, 'dd MMM');
    const existingData = data.find((item) => item.date === currentDateStr);

    if (existingData) {
      filteredData.push(existingData);
    } else {
      filteredData.push({ date: currentDateStr, sales: 0 });
    }
    // @ts-ignore
    currentDate = addDays(currentDate, 1);
  }

  // Check the data if we have the data about this day we add this to filteredData array
  data.forEach((item) => {
    if (!dataSet.has(item.date)) {
      filteredData.push(item);
    }
  });

  // Sorting data "ascending" (1,2,3,4,5)
  // @ts-ignore
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return filteredData;
};
