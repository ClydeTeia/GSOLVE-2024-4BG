import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Classroom {
  id: string;
  name: string;
}

interface Props {
  classroomListData: Classroom[];
  onSelectClassroom: (classroomId: string) => void;
}

function DisplayClassroomLists({
  classroomListData,
  onSelectClassroom,
}: Props) {
  console.log(classroomListData);
  return !classroomListData ? (
    <div className="text-center">
      <h3 className="ml-4 mb-4">Classrooms</h3>
      <p className="text-sm text-gray-500">
        No classrooms created yet. Create Now
      </p>
    </div>
  ) : (
    <div className="w-1/3 h-full">
      <h3 className="ml-4">Classrooms</h3>
      {classroomListData.map((classroom) => (
        <div
          key={classroom.id}
          onClick={() => {
            onSelectClassroom(classroom.id);
            console.log(classroom.id);
          }}
        >
          <Button className="flex flex-row w-full rounded-none">
            <h3>{classroom.name} {classroom.id}</h3>
          </Button>
          <Separator />
        </div>
      ))}
    </div>
  );
}

export default DisplayClassroomLists;
