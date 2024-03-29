"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type Props = {
  params: string;
  challengeData: ChallengeProp[] | null;
};

const DisplayMember = ({ params, challengeData }: Props) => {
  console.log("On DisplayMember " + params);

  console.log(challengeData, "skka");

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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 p-10">
        <p className="text-2xl font-bold ">Share this link to add them!</p>
        <div className="flex items-center justify-center w-full h-10 p-5 border  border-gray-300 bg-gray-200 rounded-md text-sm">{`${process.env.NEXT_PUBLIC_PATH}/classroom/join/${params}`}</div>
        <Button
          className="w-fit p-6 bg-blue-600 hover:bg-blue-500"
          onClick={handleInviteClick}
        >
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default DisplayMember;
