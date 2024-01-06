import dayjs from 'dayjs';
import { useMemo } from 'react';

export interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}

type CalendarWeeks = CalendarWeek[];

export function useCalendarWeeks(date: dayjs.Dayjs, blockedDates: { blockedWeekdays: number[], blockedDates: number[] }) {

  const getCalendarWeeks = () => {
    if(!blockedDates) {
      return [];
    }
    
    const daysInMonthArray = Array
      .from({ length: date.daysInMonth() })
      .map((_, index) => {
        const day = date.set('date', index + 1);
        return {
          date: day,
          disabled: day.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekdays?.includes(day.get('day')) ||
            blockedDates?.blockedDates.includes(day.get('date'))
        };
      });

    const firstWeekDay = date.get('day');

    const previousMonthFillArray = Array
      .from({ length: firstWeekDay })
      .map((_, index) => {
        return {
          date: date.subtract(firstWeekDay - index, 'day'),
          disabled: true
        };
      });

    const lastDayInCurrentMonth = date.set('date', date.daysInMonth());
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array
      .from({ length: 7 - (lastWeekDay + 1) })
      .map((_, index) => {
        return {
          date: lastDayInCurrentMonth.add(index + 1, 'day'),
          disabled: true,
        };
      });

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ];

    const calendarWeeks: CalendarWeeks = [];

    for (let i = 0;i < calendarDays.length;i += 7) {
      calendarWeeks.push({
        week: i / 7,
        days: calendarDays.slice(i, i + 7)
      });
    }

    return calendarWeeks;
  };

  return useMemo(getCalendarWeeks, [date, blockedDates]);
}