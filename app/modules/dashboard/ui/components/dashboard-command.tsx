"use client";

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <>
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a meeting or agent" />
        <CommandList className="p-2">Test</CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
