import { Minus, Plus } from "lucide-react";
import { Button } from "../vendor/button";

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  label?: string;
}

export default function Stepper({
  value,
  onChange,
  min = 1,
  max,
  label = "Guests",
}: StepperProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex flex-col ">
      <div
        className="flex items-center gap-4"
        role="group"
        aria-labelledby="stepper-label"
      >
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={decrease}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus />
        </Button>

        <span aria-live="polite" className="min-w-6 text-center text-navy-800">
          {value}
        </span>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={increase}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
