"use client";

import React from "react";
import JoinTab from "./joinTab";
import StudentClassList, { ClassListType } from "./studentClassList";
import { Separator } from "@/components/ui/separator";

function StudentClassroom({classrooms}: {classrooms: ClassListType[]}) {
  return (
    <main className=" bg-[#E8F3F1] w-full h-full">
      <div className="min-h-1/4">
        <JoinTab />
      </div>
      <Separator />
      <div className="h-3/4 p-12">
        <StudentClassList classrooms={classrooms}/>
      </div>
    </main>
  );
}

export default StudentClassroom;