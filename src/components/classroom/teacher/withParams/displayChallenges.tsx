"use client";

import React from "react";
import { CreateChallengeButton } from "../createChallenge";
import Link from "next/link";

type Props = {
  challengeData: ChallengeProp[] | null;
  isOwner: [] | null;
  link: string
};

function DisplayChallenges({ link, challengeData, isOwner }: Props) {
  console.log(isOwner,'aaaj')
  return (
    <div className="w-full h-full">
      {!challengeData && (
        <div className="text-center flex flex-col justify-center items-center w-full h-full gap-3">
          <div>No challenges available</div>
          {isOwner && (
            <>
              <div>Create a challenge</div>
              <CreateChallengeButton link={link} />
            </>
          )}
        </div>
      )}
      {challengeData &&
        challengeData.map((challenge) => (
          <Link key={challenge.title} href={{
            pathname: `/playground/${challenge.title}`,
            query: { challengeText: challenge.challengeText },
          }}>
            <div className="flex flex-col gap-3 w-full rounded-md shadow-md p-5 border border-[#77baac]">
              <div>
                <span className="font-bold">
                  {challenge.title.toUpperCase() + ' '}
                </span>
                {challenge.challengeText}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default DisplayChallenges;
