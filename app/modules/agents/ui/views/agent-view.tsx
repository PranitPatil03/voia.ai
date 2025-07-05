import { useTRPC } from "@/app/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentViews = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <>{JSON.stringify(data, null, 2)}</>;
};
