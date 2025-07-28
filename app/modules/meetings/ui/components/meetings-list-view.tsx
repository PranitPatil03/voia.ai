"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      ></NewMeetingDialog>
      <div className="py-4 px-4 flex flex-col gap-y-4">
        <div className="flex items-center justify-between px-4">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl">
            <PlusIcon />
            New Meeting
          </Button>
        </div>
      </div>
      <ScrollArea>
        <div className="flex items-center gap-x-2 px-8 py-2">
          <MeetingsSearchFilter></MeetingsSearchFilter>
          <StatusFilter></StatusFilter>
          <AgentIdFilter></AgentIdFilter>
          {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}>
              <XCircleIcon className="size-4"></XCircleIcon>
              Clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>
    </>
  );
};
