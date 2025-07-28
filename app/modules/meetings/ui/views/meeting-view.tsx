"use client";

import { useTRPC } from "@/app/trpc/client";
import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      ) : (
        <DataTable columns={columns} data={data.items} />
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
