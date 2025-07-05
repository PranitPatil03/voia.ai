import { AgentViews } from "@/app/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Hello</p>}>
        <AgentViews />;
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
