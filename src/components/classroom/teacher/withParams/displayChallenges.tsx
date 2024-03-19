import React from "react";
import { CreateChallengeButton } from "../../createChallenge";

type Props = {
  challengesData: ChallengeProp[] | null;
};

function DisplayChallenges({ challengesData }: Props) {
  return (
    <div className="w-full h-full">
      {!challengesData && (
        <div className="text-center flex flex-col justify-center items-center w-full h-full gap-3">
          <div>No challenges available</div>
          <div>Create a challenge</div>
          <CreateChallengeButton />
        </div>
      )}
      {challengesData &&
        challengesData.map((challenge) => (
          <div key={challenge.id}>
            <div>{challenge.name}</div>
          </div>
        ))}{" "}
    </div>
  );
}

export default DisplayChallenges;
