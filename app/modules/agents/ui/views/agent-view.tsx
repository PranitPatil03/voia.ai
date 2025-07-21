"use client";

import { useTRPC } from "@/app/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";

export const AgentViews = () => {
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="pb-4 px-4 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No agents found"
          description="Create your first AI agent to start automating your meetings and tasks. Agents can help you with scheduling and more."
        />
      )}
    </div>
  );
};
