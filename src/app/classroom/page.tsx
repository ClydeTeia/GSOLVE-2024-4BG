"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { use, useEffect, useState } from "react";
import { CreateClassroom } from "@/components/classroom/createClassroom";
import DisplayClassroomLists from "@/components/classroom/displayClassroomLists";
import DisplayClassroomInfo from "@/components/classroom/displayClassroomInfo";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/firebaseContext";
import { readData } from "@/firebase/crud";
import { getStudentClassroomInfo } from "../../../utils/classroom/getStudentClassroomInfo";

type Props = {};

export default function Classroom({}: Props) {
  const router = useRouter();

  const user = UserAuth().user;
  const userId = user?.uid;

  const [classroomListData, setClassroomListData] = useState<[]>([]);
  const [classroomInfoData, setClassroomInfoData] = useState<[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [isClassCreated, setIsClassCreated] = useState<boolean>(false);
  const [isStudentAdded, setIsStudentAdded] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !userId) {
      console.log("No user is signed in.");
      router.push("/login");
    }

    // fetch classroom list data
    async function fetchData(userId: string) {
      await readData("classrooms", "teacherId", userId).then((res) => {
        setClassroomListData(res);
      });
    }

    fetchData(userId!);

    console.log("from client", userId);
  }, [router, userId]);

  useEffect(() => {
    async function fetchData(userId: string) {
      if (isClassCreated && userId) {
        await readData("classrooms", "teacherId", userId).then((res) => {
          setClassroomListData(res);
        });
      }
      setIsClassCreated(false);
    }

    fetchData(userId!);
  }, [isClassCreated, userId]);

  useEffect(() => {
    if (!selectedClassroom) return;
    const res = getStudentClassroomInfo(selectedClassroom).then((res) => {
      console.log(res);
      setClassroomInfoData(res);
    });
    setIsStudentAdded(false);
  }, [isStudentAdded, selectedClassroom]);

  useEffect(() => {
    if (!selectedClassroom) return;
    const res = getStudentClassroomInfo(selectedClassroom).then((res) => {
      console.log(res);
      setClassroomInfoData(res);
    });
    console.log("Selected Classroom", selectedClassroom);
  }, [selectedClassroom]);

  const handleClassroomClick = async (classroomId: string) => {
    // Set the selected classroom
    setSelectedClassroom(classroomId);
    console.log("Selected classroom:", classroomId);

    const res = getStudentClassroomInfo(classroomId).then((res) => {
      console.log(res);
      setClassroomInfoData(res);
    });
    console.log("Classroom Info:", res);
  };

  return (
    <main>
      <div className="flex justify-between items-center mx-10 my-5">
        <h3>Classroom Panel</h3>
        <CreateClassroom setIsClassCreated={setIsClassCreated} />
      </div>
      <div className="flex">
        <DisplayClassroomLists
          classroomListData={classroomListData}
          onSelectClassroom={handleClassroomClick}
        />
        <div className="w-full h-full">
          <DisplayClassroomInfo
            classroomInfoData={classroomInfoData}
            selectedClassroom={selectedClassroom}
            setIsStudentAdded={setIsStudentAdded}
          />
        </div>
      </div>
    </main>
  );
}
