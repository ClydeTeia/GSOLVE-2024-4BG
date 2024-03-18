import React from "react";
import { Separator } from "../../ui/separator";
import TeacherClassList from "./teacherClassList";
import CreateClassroom from "../createClassroom";

type Props = {};

/*
#77baac new 
#66BAA8
#00A98B
#EBFDF8
#E8F3F1
*/

function TeacherClassroom({}: Props) {
  return (
    <main className=" bg-[#E8F3F1] w-full h-full">
      <div className="h-full w-full">
        <div className="bg-white p-12 h-1/4 flex items-center">
          <CreateClassroom />
        </div>
        <div className="h-3/4 w-full">
          <Separator className="bg-[#77baac]" />
          <div className="p-12">
            <TeacherClassList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default TeacherClassroom;
