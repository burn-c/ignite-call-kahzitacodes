import { CaretLeft, CaretRight } from 'phosphor-react';
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from './styles';
import { getWeekdays } from '@/utils/get-weekdays';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CalendarWeek, useCalendarWeeks } from '@/hooks/useCalendarWeeks';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

interface BlockedDates {
  blockedWeekdays: number[];
  blockedDates: number[];
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [shortWeekdays, setShortWeekdays] = useState<string[]>();
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1);
  });

  const router = useRouter();

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: ['blockedDates', currentDate.get('year'), currentDate.get('month')],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.format('MM'),
        }
      });

      return data;
    },
  });

  const calendarWeeks = useCalendarWeeks(currentDate, blockedDates as BlockedDates);

  useEffect(() => {
    const getShortWeekdays = getWeekdays({ short: true });
    setShortWeekdays(getShortWeekdays);
  }, []);
  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const username = String(router.query.username);

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month');
    setCurrentDate(previousMonth);
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month');
    setCurrentDate(nextMonth);
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês anterior"><CaretLeft /></button>
          <button onClick={handleNextMonth} title="Próximo mês"><CaretRight /></button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekdays?.map(weekday => <th key={weekday}>{weekday}</th>)}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks?.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}