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
import { DeleteBtn } from "./deleteClass";
import { toast } from "sonner";

export function DropdownMenuButton() {
  const handleInviteClick = () => {
    const inviteText = "Your invite text here";
    navigator.clipboard
      .writeText(inviteText)
      .then(() => {
        toast("Successfully copied invite link", {
          description: inviteText,
        });
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
            Invite Link
          </DropdownMenuItem>
          <DeleteBtn />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
