import { meetingsRouter } from "@/app/modules/meetings/server/procedures";
import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/app/modules/agents/server/procedures";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings:meetingsRouter
});

export type AppRouter = typeof appRouter;
