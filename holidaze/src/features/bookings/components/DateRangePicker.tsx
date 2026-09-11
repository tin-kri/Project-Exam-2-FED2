import { useState } from "react";
import { Calendar } from "@/components/vendor/calendar";
import { type DateRange } from "react-day-picker";

type DateRangePickerProps = {
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
  disabledDates?: DateRange[];
};

export default function DateRangePicker({
  date,
  onSelect,
  disabledDates = [],
}: DateRangePickerProps) {
  const [month, setMonth] = useState<Date>(date?.from ?? new Date());

  return (
    <Calendar
      mode="range"
      month={month}
      onMonthChange={setMonth}
      selected={date}
      onSelect={onSelect}
      numberOfMonths={1}
      disabled={[{ before: new Date() }, ...disabledDates]}
      className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(11)]  rounded-md shadow-sm"
    />
  );
}
