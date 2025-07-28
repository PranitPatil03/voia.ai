import { MeetingIdView, MeetingIdViewLoading } from "@/app/modules/meetings/ui/views/meeting-id-view";
import { MeetingIdViewError } from "@/app/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { auth } from "@/lib/auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ meetingId: string }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-up");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingId={meetingId}></MeetingIdView>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
