import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


type DateRangePickerProps = {
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
};

export default function DateRangePicker({
  date,
  onSelect,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full rounded-md justify-start text-left font-normal",
            !date && "text-muted-foreground",
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
          defaultMonth={date?.from}
          selected={date}
          onSelect={onSelect}
          numberOfMonths={1}
          disabled={(day) => day < new Date()}
          className="[--cell-radius:9999px] "
          classNames={{
            selected: "bg-sky-300",
            months: "flex flex-row gap-4",
            day_button:
              "rounded-full hover:bg-sky-100 transition-colors " +
              "group-data-[focused=true]/day:!ring-sky-500 group-data-[focused=true]/day:!border-sky-300 " +
              "data-[selected-single=true]:!bg-sky-300 data-[selected-single=true]:!text-navy-800 " +
              "data-[range-start=true]:!bg-sky-300 data-[range-start=true]:!text-navy-800 " +
              "data-[range-end=true]:!bg-sky-300 data-[range-end=true]:!text-navy-800 " +
              "data-[range-middle=true]:!bg-sky-100 data-[range-middle=true]:!text-navy-800 data-[range-middle=true]:!rounded-none",
          }}
        />
      </PopoverContent>
      
    </Popover>
  );
}
