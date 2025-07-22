"use client";

import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useSuspenseQuery } from "@tanstack/react-query";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
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
