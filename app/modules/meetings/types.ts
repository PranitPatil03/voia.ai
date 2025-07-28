import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/app/trpc/routers/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];

export type MeetingGetMany =
  inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];

export enum MeetingStauts {
  Upcomming = "upcoming",
  Active = "active",
  Processing = "processing",
  Cancelled = "cancelled",
  Completed = "completed",
}
