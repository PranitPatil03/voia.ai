import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { trpc } from "@/app/trpc/server";
import MeetingView, {
  MeetingIdViewError,
  MeetingtIdViewLoading,
} from "@/app/modules/meetings/ui/views/meeting-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MeetingsListHeader } from "@/app/modules/meetings/ui/components/meetings-list-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { loadSearchParams } from "@/app/modules/meetings/params";
import type { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-up");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <NuqsAdapter>
      <MeetingsListHeader></MeetingsListHeader>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingtIdViewLoading />}>
          <ErrorBoundary fallback={<MeetingIdViewError />}>
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </NuqsAdapter>
  );
}