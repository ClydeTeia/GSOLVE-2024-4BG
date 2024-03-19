"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CreateChallengeButton } from "@/components/classroom/createChallenge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const challenges = [];

type memberProps = {
  id: string;
  name: string;
};

const members: memberProps[] = [
  // {
  //   id: "unique-id",
  //   name: "Ian",
  // },
  // {
  //   id: "unique-id1",
  //   name: "Yoo",
  // },
  // {
  //   id: "unique-id2",
  //   name: "Chad",
  // },
];

type Props = {
  params: {
    id: string;
  };
};

export default function UniqueClassroom({ params }: Props) {
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

  const handleInviteClick = () => {
    const inviteText = `http://localhost:3000/classroom/join/${params.id}`;
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
              <>
                {/* You can change if it returns null */}

                {challenges.length > 0 ? (
                  <div>There are challenges</div>
                ) : (
                  <div className="text-center flex flex-col justify-center items-center w-full h-full gap-3">
                    <div>No challenges available</div>
                    <div>Create a challenge</div>
                    <CreateChallengeButton />
                  </div>
                )}
              </>
            )}
            {isMember && (
              <>
                {/* You can change if it returns null */}
                {members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.id}>
                      <p>{member.name}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    Share this link to add them!
                    <Button onClick={handleInviteClick}></Button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="md:w-2/5 hidden md:block border">yo</div>
        </div>
      </div>
    </main>
  );
}
