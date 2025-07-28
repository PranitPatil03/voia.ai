"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <div className="flex items-center gap-x-2 px-4 py-2"></div>
    </>
  );
};
