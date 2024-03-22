"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CreateChallengeButton } from "@/components/classroom/teacher/createChallenge";
import { useRouter } from "next/navigation";
import DisplayMember from "@/components/classroom/teacher/withParams/displayMember";
import DisplayChallenges from "@/components/classroom/teacher/withParams/displayChallenges";
import ClassDetails from "@/components/classroom/teacher/withParams/classDetails";
import { readData } from "@/firebase/crud";
import { UserAuth } from "@/app/context/firebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

type Props = {
  params: {
    id: string;
  };
};

export default function UniqueClassroom({ params }: Props) {
  const [isOwner, setIsOwner] = useState<[] | null>(null);
  console.log("On class[id]" + params.id);
  const router = useRouter();

  const [challengesData, setChallengesData] = useState([]);
  console.log(params.id);
  const [isChallenge, setIsChallenge] = useState<boolean>(true);
  const [isMember, setIsMember] = useState<boolean>(false);

  const user = UserAuth().user;
  const userId = user?.uid;

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

    const fetchChallenges = async () => {
      const usersRef = collection(db, "classrooms");
      const usersQuery = query(usersRef, where("link", "==", params.id));
      const querySnapshot = await getDocs(usersQuery);
      console.log(querySnapshot.docs[0].data().challenges, 'akakak')
      setChallengesData(querySnapshot.docs[0].data().challenges)
    }

    fetchChallenges();
    checkToken();

    fetchAdmin();
  }, [router, user, userId]);

  async function fetchAdmin() {
    const owner = await readData("classrooms", "teacherId", userId);
    console.log("Are you the Teacher?" + owner);
    if (!owner) return;

    if ((owner.teacherId = userId)) setIsOwner(owner);
    else setIsOwner(null);
  }

  useEffect(() => { }, []);

  function handleClickChallenge() {
    setIsChallenge(true);
    setIsMember(false);
  }

  function handleClickMember() {
    setIsChallenge(false);
    setIsMember(true);
  }

  return (
    <main className="flex h-full flex-col p-20 text-black">
      {/* Upper */}
      <div className="w-full ">
        <div className="flex ">
          <div>Class Name Here</div>
        </div>
        {isOwner && (
          <div className="flex gap-1">
            <CreateChallengeButton link={params.id} />
            <Button className="rounded-full bg-blue-500 hover:bg-blue-500/75">
              Edit
            </Button>
          </div>
        )}
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
          <div className="md:w-3/5 w-full  min-h-96">
            {isChallenge && (
              <DisplayChallenges link={params.id}
                challengeData={challengesData}
                isOwner={isOwner}
              />
            )}
            {isMember && (
              <DisplayMember params={params.id} challengeData={challengesData} />
            )}
          </div>
          <div className="md:w-2/5 hidden md:block border">
            <ClassDetails params={params.id} challengeData={challengesData} />
          </div>
        </div>
      </div>
    </main>
  );
}
