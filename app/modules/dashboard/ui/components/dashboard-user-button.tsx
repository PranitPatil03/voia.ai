"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { LogOut, User, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return null;
  }

  {
    console.log("User image:", data.user.image);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="shadow-md flex items-center gap-2 p-2 transition-colors duration-200 border border-gray-200 dark:border-none focus:outline-none focus:ring-0 dark:bg-sidebar-accent rounded-xl">
        {data.user.image ? (
          <Avatar className="size-9">
            <AvatarImage
              src={data.user.image}
              alt={data.user.name || "User avatar"}
              className="size-9"
            />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="botttsNeutral"
            className="size-9 mr-3"
          ></GeneratedAvatar>
        )}
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
            {data.user.name || "User"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
            {data.user.email}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal w-full">
          <div className="flex flex-col space-y-1 min-w-0">
            <p className="text-sm font-medium leading-none truncate max-w-[180px]">
              {data.user.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate max-w-[180px]">
              {data.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
