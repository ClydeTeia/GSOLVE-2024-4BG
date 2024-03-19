"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CreateChallengeButton } from "@/components/classroom/createChallenge";
import { useRouter } from "next/navigation";
import DisplayMember from "@/components/classroom/teacher/withParams/displayMember";
import DisplayChallenges from "@/components/classroom/teacher/withParams/displayChallenges";

// change this to the commented ones for testing
const challengesData: ChallengeProp[] | null = null;
// [
//   {
//     id: 1,
//     name: "ASL For Everyone",
//   },
// ];

// change this to the commented ones for testing
const membersData: MemberProp[] | null = null;
// [
//  {
//    id: "unique-id",
//    name: "Ian",
//  },
//  {
//    id: "unique-id1",
//    name: "Yoo",
//  },
//  {
//    id: "unique-id2",
//    name: "Chad",
//  },
// ]

type Props = {
  params: {
    id: string;
  };
};

export default function UniqueClassroom({ params }: Props) {
  console.log("On class[id]" + params.id);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          throw new Error("Token not found");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  console.log(params.id);
  const [isChallenge, setIsChallenge] = useState<boolean>(true);
  const [isMember, setIsMember] = useState<boolean>(false);

  useEffect(() => {}, []);

  function handleClickChallenge() {
    setIsChallenge(true);
    setIsMember(false);
  }

  function handleClickMember() {
    setIsChallenge(false);
    setIsMember(true);
  }

  return (
    <main className="flex h-full flex-col p-24 text-black">
      {/* Upper */}
      <div className="w-full ">
        <div className="flex ">
          <div>Icon</div>
          <div>Name</div>
        </div>
        <div className="flex gap-1">
          <Button className="rounded-full">+</Button>
          <Button className="rounded-full">?</Button>
          <Button className="rounded-full">=</Button>
          <Button className="rounded-full">%</Button>
        </div>
      </div>
      {/* Bottom Half */}
      <div className="my-4 w-full ">
        <div className="flex gap-7">
          <button
            onClick={handleClickChallenge}
            className={`text-black underline-offset-8 ${isChallenge ? "underline hover:underline-offset-8 hover:text-blue-700" : ""}`}
          >
            Challenges
          </button>
          <button
            onClick={handleClickMember}
            className={`text-black underline-offset-8 ${isMember ? "underline hover:underline-offset-8 hover:text-blue-700" : ""}`}
          >
            Members
          </button>
        </div>
        <Separator className="mb-4 my-0.5" />
        <div className="flex">
          <div className="md:w-3/5 w-full  min-h-80">
            {isChallenge && (
              <DisplayChallenges challengesData={challengesData} />
            )}
            {isMember && (
              <DisplayMember params={params.id} membersData={membersData} />
            )}
          </div>
          <div className="md:w-2/5 hidden md:block border">Link Tab</div>
        </div>
      </div>
    </main>
  );
}
