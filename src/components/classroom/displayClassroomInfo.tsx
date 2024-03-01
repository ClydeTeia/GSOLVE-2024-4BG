import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { studentData } from "@/data/classroom/studentList";

type Props = {};

export default function DisplayClassroomInfo({}: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <h3>Classroom Info:</h3>
      <div className="w-full h-full">
        {studentData.map((student) => {
          return (
            <div key={student.id}>
              <div>{student.name}</div>
              <div>{student.email}</div>
              <Separator className="h-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
