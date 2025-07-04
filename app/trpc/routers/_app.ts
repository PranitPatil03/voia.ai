import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/app/modules/agents/server/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
