import { auth } from "@/lib/auth";
import { Suspense } from "react";
import type { SearchParams } from "nuqs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { loadSearchParams } from "@/app/modules/agents/params";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AgentViews } from "@/app/modules/agents/ui/views/agent-view";
import { AgentListHeader } from "@/app/modules/agents/ui/components/agent-list-view";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AgentIdViewLoading } from "@/app/modules/agents/ui/views/agent-id-view";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-up");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <NuqsAdapter>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentIdViewLoading />}>
          <AgentViews />
        </Suspense>
      </HydrationBoundary>
    </NuqsAdapter>
  );
};

export default Page;