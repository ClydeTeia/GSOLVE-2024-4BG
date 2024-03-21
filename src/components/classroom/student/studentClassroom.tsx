"use client";

import React from "react";
import JoinTab from "./joinTab";
import StudentClassList from "./studentClassList";
import { Separator } from "@/components/ui/separator";

type Props = {};

function StudentClassroom({}: Props) {
  return (
    <main className=" bg-[#E8F3F1] w-full h-full">
      <div className="h-1/4">
        <JoinTab />
      </div>
      <Separator />
      <div className="h-3/4 p-12">
        <StudentClassList />
      </div>
    </main>
  );
}

export default StudentClassroom;
