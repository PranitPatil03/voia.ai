import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { trpc } from "@/app/trpc/server";
import MeetingView, { MeetingIdViewError, MeetingtIdViewLoading } from "@/app/modules/meetings/ui/views/meeting-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingtIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
