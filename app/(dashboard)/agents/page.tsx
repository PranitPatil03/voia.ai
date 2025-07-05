import { AgentListHeader } from "@/app/modules/agents/ui/components/agent-list-view";
import { AgentViews } from "@/app/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { auth } from "@/lib/auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-up");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Hello</p>}>
          <AgentViews />;
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
