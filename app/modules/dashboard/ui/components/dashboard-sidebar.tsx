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
    <Sidebar className="bg-sidebar">
      <SidebarHeader className="text-sidebar-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image
            src="/logo.svg"
            alt="logo"
            height={78}
            width={78}
            className="block dark:hidden"
          />
          <Image
            src="/light-logo.svg"
            alt="logo"
            height={78}
            width={78}
            className="hidden dark:block"
          />
        </Link>
      </SidebarHeader>
      <div className="px-1 border-b border-sidebar-border pt-1 opacity-75 dark:border-sidebar-accent"></div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href} className="py-1">
                  <SidebarMenuButton
                    className={cn(
                      "h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent hover:border-sidebar-border transition-all duration-200 hover:shadow-sm dark:border-none rounded-xl",
                      pathname === item.href &&
                        "h-10 bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border transition-all duration-200 shadow-sm"
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
          <div className="px-1 py-2">
            <Separator className="opacity-85 bg-sidebar-border dark:bg-muted"></Separator>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href} className="py-1">
                  <SidebarMenuButton
                    className={cn(
                      "h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent hover:border-sidebar-border transition-all duration-200 hover:shadow-sm dark:border-none rounded-xl",
                      pathname === item.href &&
                        "h-10 bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border transition-all duration-200 shadow-sm dark:border-none"
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

      <SidebarFooter className="">
        <DashboardUserButton></DashboardUserButton>
      </SidebarFooter>
    </Sidebar>
  );
};
