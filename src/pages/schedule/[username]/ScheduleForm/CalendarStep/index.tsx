import { Calendar } from '@/components/Calendar';
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { api } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

interface Availability {
  userAgenda: number[];
  availableAgenda: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);

  const weekday = selectedDate ? dayjs(selectedDate).format('dddd') : null;
  const date = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null;

  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        }
      });

      return data;
    },
    enabled: !!selectedDate,
  });

  function handleSelectTime(hour: number) {
    const dateTime = dayjs(selectedDate).set('hour', hour).startOf('hour').toDate();

    onSelectDateTime(dateTime);
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>{weekday} <span>{date}</span></TimePickerHeader>

          <TimePickerList>
            {availability?.userAgenda?.map(hour => {
              return (
                <TimePickerItem
                  key={String(hour)}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableAgenda.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}