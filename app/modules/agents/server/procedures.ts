import { db } from "@/app/db";
import { agetns } from "@/app/db/schema";
import { baseProcedure, createTRPCRouter } from "@/app/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agetns);
    return data;
  }),
});
