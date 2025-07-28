import { z } from "zod";
import { MeetingStauts } from "./types";

export const meetingInsertSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "AgentId is required" }),
  status: z.nativeEnum(MeetingStauts).optional(),
});

export const meetingUpdateSchema = meetingInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
