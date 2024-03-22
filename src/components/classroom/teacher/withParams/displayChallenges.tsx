"use client";

import React from "react";
import { CreateChallengeButton } from "../createChallenge";
import Link from "next/link";

type Props = {
  challengeData: ChallengeProp[] | null;
  isOwner: [] | null;
};

function DisplayChallenges({ challengeData, isOwner }: Props) {
  return (
    <div className="w-full h-full">
      {!challengeData && (
        <div className="text-center flex flex-col justify-center items-center w-full h-full gap-3">
          <div>No challenges available</div>
          {isOwner && (
            <>
              <div>Create a challenge</div>
              <CreateChallengeButton />
            </>
          )}
        </div>
      )}
      <div className="flex gap-3 w-full flex-col p-5">
        {challengeData &&
          challengeData.map((challenge) => (
            <Link key={challenge.id} href={`/playground/${challenge.id}`}>
              <div className="flex flex-col gap-3 w-full rounded-md shadow-md p-5 border border-[#77baac]">
                <div>{challenge.name}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default DisplayChallenges;
