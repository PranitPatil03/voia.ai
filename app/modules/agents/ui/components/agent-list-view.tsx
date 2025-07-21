"use client";

import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import { PlusIcon, XCircle } from "lucide-react";
import { AgentSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

export const AgentListHeader = () => {
  const [filters, setFilters] = useAgentFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My agents</h5>
          <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl">
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-x-2 px-4 py-2">
        <AgentSearchFilter />
        {isAnyFilterModified && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="rounded-xl"
          >
            <XCircle />
            Clear
          </Button>
        )}
      </div>
    </>
  );
};