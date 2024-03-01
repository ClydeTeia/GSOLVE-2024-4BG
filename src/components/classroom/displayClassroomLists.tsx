import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { classroomData } from "@/data/samples/classrooms";

interface Classroom {
  id: number;
  name: string;
}
interface Props {
  classroomListData: Classroom[];
}

function DisplayClassroomLists({ classroomListData }: Props) {
  return (
    <div className="w-1/3 h-full">
      <h3 className="ml-4">Classrooms</h3>
      {classroomListData.map((classroom) => {
        return (
          <div key={classroom.id}>
            <Button className="flex flex-row w-full rounded-none">
              <h3>{classroom.name}</h3>
            </Button>
            <Separator />
          </div>
        );
      })}
    </div>
  );
}

export default DisplayClassroomLists;
