"use client";

import { useTRPC } from "@/app/trpc/client";
import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { DataPagination } from "@/app/modules/agents/ui/components/data-pagination";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";

const MeetingView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data.items}
            onRowClick={(row) => router.push(`/meetings/${row.id}`)}
          />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          ></DataPagination>
        </>
      )}
    </div>
  );
};

export const MeetingtIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeetings"
      description="This may take a fews seconds"
    ></LoadingState>
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading meeting"
      description="Something went wrong"
    ></ErrorState>
  );
};

export default MeetingView;
