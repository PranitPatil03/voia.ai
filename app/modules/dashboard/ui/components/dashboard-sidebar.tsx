"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    lable: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    lable: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    lable: "Update",
    href: "/update",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="!bg-gray-700">
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={78} width={78} alt="logo"></Image>
        </Link>
      </SidebarHeader>
      <div className="px-3 border-b pt-1 opacity-75"></div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href} className="py-1">
                  <SidebarMenuButton
                    className={cn(
                      "h-10 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-sm",
                      pathname === item.href &&
                        "h-10 bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
                    )}
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5"></item.icon>
                      <span className="text-sm font-bold tracking-tight">
                        {item.lable}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <div className="px-4 py-2">
            <Separator className="opacity-85 text-[#6d6f6e]"></Separator>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href} className="py-1">
                  <SidebarMenuButton
                    className={cn(
                      "h-10 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-sm",
                      pathname === item.href &&
                        "h-10 bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
                    )}
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5"></item.icon>
                      <span className="text-sm font-bold tracking-tight">
                        {item.lable}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-gray-400">
        <DashboardUserButton></DashboardUserButton>
      </SidebarFooter>
    </Sidebar>
  );
};
