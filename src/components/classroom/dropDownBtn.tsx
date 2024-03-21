"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteBtn } from "./teacher/deleteClass";
import { toast } from "sonner";
import { ClassListType } from "./teacher/teacherClassList";

export function DropdownMenuButton({
  classroom,
}: {
  classroom: ClassListType;
}) {
  const handleInviteClick = () => {
    const inviteText = `http://localhost:3000/classroom/join/${classroom.link}`;
    console.log(inviteText);
    navigator.clipboard
      .writeText(inviteText)
      .then(() => {
        toast("Join link copied " + inviteText);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="flex justify-center bg-transparent hover:bg-[#77baac] border-none w-4 h-3 text-xl"
        >
          <span className=" -translate-y-1.5">...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Class</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleInviteClick}>
            Copy Invite Link
          </DropdownMenuItem>
          <DeleteBtn classroom={classroom} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
