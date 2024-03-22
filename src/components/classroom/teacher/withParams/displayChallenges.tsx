"use client";

import React from "react";
import { CreateChallengeButton } from "../../createChallenge";

type Props = {
  challengesData: ChallengeProp[] | null;
  link: string
};

function DisplayChallenges({ link, challengesData }: Props) {
  return (
    <div className="w-full h-full">
      {!challengesData && (
        <div className="text-center flex flex-col justify-center items-center w-full h-full gap-3">
          <div>No challenges available</div>
          <div>Create a challenge</div>
          <CreateChallengeButton link={link}/>
        </div>
      )}
      {challengesData &&
        challengesData.map((challenge) => (
          <div key={challenge.title}>
            <div>{challenge.title}</div>
          </div>
        ))}
    </div>
  );
}

export default DisplayChallenges;
