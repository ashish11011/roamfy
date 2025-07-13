"use client";
import { DatePicker } from "@/components/datePicker";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const TitleDatepicker = ({ title, value, onChange, className }) => {
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <p className="font-medium">{title}</p>
      <DatePicker date={dayjs(value).toDate()} setDate={onChange} />
    </div>
  );
};

export default TitleDatepicker;
