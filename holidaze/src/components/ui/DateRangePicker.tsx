
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

 
type DateRangePickerProps = {
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
};

export default function DateRangePicker({ date, onSelect }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >

          <CalendarIcon className="mr-2 size-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">

                <Calendar
          mode="range"
          selected={date}
          onSelect={onSelect}
          disabled={{ before: new Date() }}
          classNames={{
            months: "flex flex-col gap-4",
            month: "w-full",
            nav: "flex items-center justify-between mb-4",
            month_caption: "font-serif text-sm font-bold text-navy-800",
            weekday: "text-xs text-grey-900 font-normal",
            day: "h-9 w-9 rounded-full text-sm text-grey-900 hover:bg-sky-100",
            day_button: "h-9 w-9 rounded-full",
            selected: "bg-navy-800 text-white rounded-full hover:bg-navy-800",
            range_start: "bg-navy-800 text-white rounded-full",
            range_end: "bg-navy-800 text-white rounded-full",
            range_middle: "bg-sky-100 text-navy-800 rounded-none",
            today: "font-bold text-navy-800",
            disabled: "text-grey-200 opacity-40",
          }}
        />

              {/* <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onSelect}
          numberOfMonths={2}
          disabled={(day) => day < new Date()}
          classNames={{ months: "flex flex-row gap-4" }}
        /> */}

      </PopoverContent>
    </Popover>
  );

  
}
