"use client"

import { UserAuth } from "@/app/context/firebaseContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { joinClassroom } from "../../../../../utils/classroom/joinClassroom";

export default function JoinPage({ params }: { params: { link: string } }) {
  const {user} = UserAuth();
  const router = useRouter();

  const handleJoin = async () => {
    await joinClassroom(params.link, user);
    console.log('joined')
    router.push(`/classroom/${params.link}`);
  }

  return (
    <div className="flex items-center justify-center h-full">
      Would you like to join the class {params.link}?
      <Button onClick={handleJoin}>
        Yes
      </Button>
      <Button onClick={() => {
        router.back();
      }}>
        No
      </Button>
    </div>
  )
}