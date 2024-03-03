import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createData, readAllData, updateData } from "@/firebase/crud";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { toast } from "sonner";
import { AddStudentToClassroom } from "../../../utils/classroom/addStudentToClassroom";

export default function AddStudentButton({
  classroomId,
  setIsStudentAdded,
}: {
  classroomId: string;
  setIsStudentAdded: any;
}) {
  const [students, setStudents] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await readAllData("users");
        console.log(usersData);
        setStudents(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!classroomId) {
    return null;
  }

  const handleAddStudent = async (students: any) => {
    if (!students) {
      console.error("Please select a students to add to the classroom.");
      return;
    }

    console.log("Selected students:", students);

    try {
      await AddStudentToClassroom(classroomId, students); //classroomId, students
      console.log("Student added successfully!");
      setIsStudentAdded(true);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Students</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Students</DialogTitle>
            <DialogDescription>
              Add students to your own classroom
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            <p>Name: </p>
            <ScrollArea className="h-fit w-full rounded-md border">
              {students.map((student: any) => (
                <div key={student.id}>
                  <div className="flex justify-between items-center mx-2">
                    <div className="py-4 pl-1">
                      <div>{student.username}</div>
                    </div>
                    <Button
                      className=""
                      variant="outline"
                      onClick={() => {
                        handleAddStudent(student);
                        toast("Student has been added", {
                          description: `at ${classroomId} `,
                        });
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <Separator
                    orientation="horizontal"
                    className="bg-gray-900 h-0.5"
                  />
                </div>
              ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
