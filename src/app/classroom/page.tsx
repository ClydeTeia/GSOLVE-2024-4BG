"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Delete } from "@/components/buttons/deleteButton";
import { CreateClassroom } from "@/components/classroom/createClassroom";
import DisplayClassroomLists from "@/components/classroom/displayClassroomLists";
import DisplayClassroomInfo from "@/components/classroom/displayClassroomInfo";

type Props = {};

export default function Classroom({}: Props) {
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
        <DisplayClassroomLists />
        <div className="w-full h-full">
          <DisplayClassroomInfo />
        </div>
      </div>
    </main>
  );
}
