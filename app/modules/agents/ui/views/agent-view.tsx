"use client";

import { useTRPC } from "@/app/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentViews = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="pb-4 px-4 md:px-6 flex flex-col gap-y-4">
      {data.length === 0 ? (
        <EmptyState
          title="No agents found"
          description="Create your first AI agent to start automating your meetings and tasks. Agents can help you with scheduling and more."
        />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
};
