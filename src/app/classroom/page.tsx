"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/firebaseContext";
import { readData } from "@/firebase/crud";
import { getStudentClassroomInfo } from "../../../utils/classroom/getStudentClassroomInfo";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import TeacherClassroom from "@/components/classroom/teacher/teacherClassroom";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import StudentClassroom from "@/components/classroom/student/studentClassroom";
import { ClassListType } from "@/components/classroom/teacher/teacherClassList";

type Props = {};

export default function Classroom({}: Props) {
  const router = useRouter();

  const user = UserAuth().user;
  const userId = user?.uid;

  const [classroomListData, setClassroomListData] = useState<ClassListType[]>(
    []
  );
  const [userRole, setUserRole] = useState<string | null>("loading");
  const [selectedRole, setSelectedRole] = useState<string>("student");

  useEffect(() => {
    "use client";
    const token = localStorage.getItem("Token");

    if (!token) {
      console.log("No user is signed in.");
      router.push("/login");
    }

    async function fetchStudentClassrooms(user: DocumentData) {
      try {
        const q = query(
          collection(db, "classrooms"),
          where("students", "array-contains", {
            email: user.email,
            name: user.username,
          })
        );

        const querySnapshot = await getDocs(q);

        const studentClassrooms: any[] = [];
        querySnapshot.forEach((doc) => {
          const classroomData = doc.data();
          studentClassrooms.push(classroomData);
        });

        setClassroomListData(studentClassrooms);
      } catch (error) {
        console.error("Error fetching student classrooms:", error);
      }
    }

    const fetchUserRole = async () => {
      try {
        // Get the user's data from Cloud Firestore
        const userDoc = await getDoc(doc(db, "users", user!.uid));

        if (userDoc.exists()) {
          // User data exists, retrieve the role
          const userData = userDoc.data();
          setUserRole(userData.role);
          console.log("role is", userData);
          if (userData.role === "student") {
            fetchStudentClassrooms(userData);
          }
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();

    console.log("from client", userId);
  }, [router, user, userId]);

  const handleRoleSubmit = async () => {
    try {
      console.log(selectedRole);
      // Update the user's role in Firestore
      await setDoc(doc(db, "users", user!.uid), {
        email: user?.email,
        username: user?.displayName,
        userId: userId,
        role: selectedRole,
      });

      // Update the local state
      setUserRole(selectedRole);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (userRole === "loading") {
    return (
      <main className="flex w-full h-full flex-col">
        <div className="min-h-1/4 p-12">
          <Skeleton className="h-32 w-36 bg-[#D9D9D9]" />
        </div>
        <Separator className="bg-[#77baac]" />
        <div className="h-3/4 w-full p-12 bg-[#E8F3F1]">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5">
            <Skeleton className="w-full h-32 bg-[#D9D9D9]" />
            <Skeleton className="w-full h-32 bg-[#D9D9D9]" />
          </div>
        </div>
      </main>
    );
  }

  if (!userRole) {
    return (
      <main className="flex items-center justify-center h-full">
        <div className="text-center">
          <p>Select User Role</p>
          <RadioGroup
            defaultValue="student"
            onValueChange={(value) => setSelectedRole(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="r1" />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="teacher" id="r2" />
              <Label htmlFor="r2">Teacher</Label>
            </div>
          </RadioGroup>
          <br />
          <Button onClick={handleRoleSubmit}>Submit Role</Button>
        </div>
      </main>
    );
  } else if (userRole === "teacher") {
    return <TeacherClassroom />;
  } else if (userRole === "student") {
    return <StudentClassroom classrooms={classroomListData} />;
  }
}
