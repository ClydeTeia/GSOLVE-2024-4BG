"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type MemberProp = {
  id: string;
  name: string;
};

type Props = {
  params: string;
  membersData: MemberProp[] | null;
};

const DisplayMember = ({ params, membersData }: Props) => {
  console.log("On DisplayMember " + params);

  const handleInviteClick = () => {
    const inviteText = `http://localhost:3000/classroom/join/${params}`;
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
      {!membersData && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 p-10">
          <p className="text-2xl font-bold ">Share this link to add them!</p>
          <div className="flex items-center justify-center w-full h-10 p-5 border border-gray-300 bg-gray-200 rounded-md text-sm">{`http://localhost:3000/classroom/join/${params}`}</div>
          <Button className="w-fit p-6" onClick={handleInviteClick}>
            Copy Link
          </Button>
        </div>
      )}
      {membersData &&
        membersData.map((member) => (
          <div key={member.id} className="flex flex-col w-full h-full">
            <p>{member.name}</p>
          </div>
        ))}
    </div>
  );
};

export default DisplayMember;
