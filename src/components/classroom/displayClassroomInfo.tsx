import { Separator } from "@radix-ui/react-separator";
import AddStudentButton from "./addStudentsToClass";

interface StudentList {
  id: number;
  name: string;
  email: string;
}

interface Props {
  classroomInfoData: StudentList[];
  selectedClassroom: string;
  setIsStudentAdded: any;
}

interface Props {
  classroomInfoData: StudentList[];
  selectedClassroom: string;
  setIsStudentAdded: any;
}

export default function DisplayClassroomInfo({
  classroomInfoData,
  selectedClassroom,
  setIsStudentAdded,
}: Props) {
  // useEffect(() => {
  //   console.log("Classroom Info:", selectedClassroom);

  //   // fetch classroom info data
  //   readData("classrooms", `${selectedClassroom}`, "students").then((res) => {
  //     console.log(res);
  //     setClassroomInfoData(res);
  //   });
  // }, [selectedClassroom]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between mr-14">
        <h3>Classroom Info:</h3>
        <AddStudentButton
          classroomId={selectedClassroom}
          setIsStudentAdded={setIsStudentAdded}
        />
      </div>

      <div className="w-full h-full">
        {classroomInfoData.map((student: StudentList) => {
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
