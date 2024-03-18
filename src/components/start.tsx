"use client";

import React, { FC } from "react";
import { Button } from "./ui/button";

interface startProps {
  textChallenge: string;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  enableWebcam: any;
}

const Start: FC<startProps> = ({
  textChallenge,
  setHasStarted,
  enableWebcam,
}) => {
  return (
    <div className="w-3/5 h-3/5 m-auto  text-center">
      <h3 className="text-4xl text-gray-600"> Spell </h3>
      <h3 className="text-7xl font-bold mt-4 text-green-700">
        {textChallenge}
      </h3>
      <h4 className="text-4xl mt-4 text-gray-600"> using ASL hand signs </h4>
      <button
        className="bg-yellow-300 text-black w-28 h-12 mt-8 font-semibold text-xl rounded-md"
        onClick={() => {
          setHasStarted(true);
          enableWebcam();
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Start;
