import { useState } from 'react';
import { CalendarStep } from './CalendarStep';
import { ConfirmStep } from './ConfirmStep';

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null);
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        scheduledDate={selectedDateTime}
        onCancelSchedule={handleClearSelectedDateTime}
      />
    );
  }

  return (
    <CalendarStep onSelectDateTime={setSelectedDateTime} />
  );
}