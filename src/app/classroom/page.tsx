"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Delete } from "@/components/buttons/deleteButton";
import { CreateClassroom } from "@/components/classroom/createClassroom";
import DisplayClassroomLists from "@/components/classroom/displayClassroomLists";
import DisplayClassroomInfo from "@/components/classroom/displayClassroomInfo";
import { auth } from "@/firebase/config";
import { readData } from "@/firebase/crud";
import { useRouter } from "next/navigation";

type Props = {};

export default function Classroom({}: Props) {
  const router = useRouter();

  const user = auth?.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    // fetch classroom list data
    const fetchData = async () => {
      try {
        const res = await readData("classrooms", "userId", userId);
        setClassroomListData(res);
      } catch (error) {
        console.error("Error fetching classroom list data:", error);
      }
    };
    fetchData();
    console.log("from client", userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [classroomListData, setClassroomListData] = useState([]);
  const [classroomInfodata, setClassroomInfoData] = useState([]);

  // const [classroomId, setClassroomId] = useState("");
  // const [studentData, setStudentData] = useState<{
  //   name: string;
  //   email: string;
  // }>({ name: "", email: "" });

  // const handleCreateClassroom = async () => {
  //   const classroomId = await createClassroom({
  //     name: "Math",
  //     teacherID: "123",
  //     students: [],
  //   });
  //   if (classroomId) {
  //     setClassroomId(classroomId);
  //   }
  // };

  // addStudentToClassroom(classroomId, { name: "John Doe", age: 15, grade: 10 });

  return (
    <main>
      <div className="flex justify-between items-center mx-10 my-5">
        <h3>Classroom Panel</h3>
        <CreateClassroom />
      </div>
      <div className="flex w-full h-full">
        <DisplayClassroomLists classroomListData={classroomListData} />
        <div className="w-full h-full">
          <DisplayClassroomInfo />
        </div>
      </div>
    </main>
  );
}
