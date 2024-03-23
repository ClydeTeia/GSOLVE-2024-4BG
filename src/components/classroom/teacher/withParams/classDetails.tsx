"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  params: string;
  challengeData: ChallengeProp[] | null;
};

function ClassDetails({ params, challengeData }: Props) {
  const handleInviteClick = () => {
    const inviteText = `${process.env.NEXT_PUBLIC_PATH}/classroom/join/${params}`;
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

  console.log("Class Details" + params);
  return (
    <div className="flex w-full gap-5 h-full flex-col p-5 items-center">
      <div className="w-full flex flex-col gap-3">
        <p className="w-full text-left">INVITE LINK</p>
        <div className="flex w-full items-center gap-2">
          <div className="p-2 rounded-md border-gray-300 border-2">{`${process.env.NEXT_PUBLIC_PATH}/classroom/join/${params}`}</div>
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            onClick={handleInviteClick}
          >
            Copy Link
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <p className="w-full text-left">Class Info </p>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <Image
              src={"/icons/target.png"}
              alt={"challenge icon"}
              width={24}
              height={24}
            ></Image>
            Challenges {0}
          </div>
          <div className="flex gap-2">
            <Image
              src={"/icons/people.png"}
              alt={"members icon"}
              width={24}
              height={24}
            ></Image>
            Members {0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassDetails;
