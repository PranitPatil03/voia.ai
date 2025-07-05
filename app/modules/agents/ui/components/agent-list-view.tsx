"use client";

import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";

export const AgentListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My agents</h5>
          <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl">New Agent</Button>
        </div>
      </div>
    </>
  );
};
