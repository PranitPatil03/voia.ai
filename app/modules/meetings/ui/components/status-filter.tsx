import { CommandSelect } from "@/components/commad-select";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { MeetingStauts } from "../../types";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
} from "lucide-react";

const Options = [
  {
    id: MeetingStauts.Upcomming,
    value: MeetingStauts.Upcomming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon></ClockArrowUpIcon>
        {MeetingStauts.Upcomming}
      </div>
    ),
  },
  {
    id: MeetingStauts.Active,
    value: MeetingStauts.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon></LoaderIcon>
        {MeetingStauts.Active}
      </div>
    ),
  },
  {
    id: MeetingStauts.Cancelled,
    value: MeetingStauts.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon></CircleXIcon>
        {MeetingStauts.Cancelled}
      </div>
    ),
  },
  {
    id: MeetingStauts.Completed,
    value: MeetingStauts.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon></CircleCheckIcon>
        {MeetingStauts.Completed}
      </div>
    ),
  },
  {
    id: MeetingStauts.Processing,
    value: MeetingStauts.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon></LoaderIcon>
        {MeetingStauts.Processing}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9 rounded-xl"
      options={Options}
      onSelect={(value) => setFilters({ status: value as MeetingStauts })}
      value={filters.status ?? ""}
    ></CommandSelect>
  );
};
