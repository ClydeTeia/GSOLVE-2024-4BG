"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { use, useEffect, useState } from "react";
import { CreateClassroom } from "@/components/classroom/createClassroom";
import DisplayClassroomLists from "@/components/classroom/displayClassroomLists";
import DisplayClassroomInfo from "@/components/classroom/displayClassroomInfo";
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
import { db, auth } from "@/firebase/config";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { User } from "firebase/auth";

type Props = {};

export default function Classroom({}: Props) {
  const router = useRouter();

  const user = UserAuth().user;
  const userId = user?.uid;

  const [classroomListData, setClassroomListData] = useState<any[]>([]);
  const [classroomInfoData, setClassroomInfoData] = useState<[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [isClassCreated, setIsClassCreated] = useState<boolean>(false);
  const [isStudentAdded, setIsStudentAdded] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>("loading");
  const [selectedRole, setSelectedRole] = useState<string>("student");

  useEffect(() => {
    "use client";
    const token = localStorage.getItem("Token");

    if (!token) {
      console.log("No user is signed in.");
      router.push("/login");
    }

    // fetch classroom list data
    async function fetchData(userId: string) {
      await readData("classrooms", "teacherId", userId).then((res) => {
        setClassroomListData(res);
      });
    }

    async function fetchStudentClassrooms(user: DocumentData) {
      try {
        console.log(user, "skjskj");
        const q = query(
          collection(db, "classrooms"),
          where("students", "array-contains", {
            email: user.email,
            id: user.userId,
            role: "student",
            userId: user.userId,
            username: user.username,
          })
        );

        const querySnapshot = await getDocs(q);

        const studentClassrooms: any[] = [];
        querySnapshot.forEach((doc) => {
          const classroomData = doc.data();
          studentClassrooms.push(classroomData);
        });

        setClassroomListData(studentClassrooms);
        console.log(studentClassrooms, "hi");
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

    fetchData(userId!);

    console.log("from client", userId);
  }, [router, user, userId]);

  useEffect(() => {
    async function fetchData(userId: string) {
      if (isClassCreated && userId) {
        await readData("classrooms", "teacherId", userId).then((res) => {
          setClassroomListData(res);
        });
      }
      setIsClassCreated(false);
    }

    fetchData(userId!);
  }, [isClassCreated, userId]);

  useEffect(() => {
    if (!isStudentAdded) return;
    if (!selectedClassroom) return;
    async function fetchData() {
      const res = await getStudentClassroomInfo(selectedClassroom).then(
        (res) => {
          console.log(res);
          setClassroomInfoData(res);
        }
      );
      setIsStudentAdded(false);
    }
    fetchData();
  }, [isStudentAdded, selectedClassroom]);

  const handleClassroomClick = async (classroomId: string) => {
    // Set the selected classroom
    setSelectedClassroom(classroomId);
    console.log("Selected classroom:", classroomId);
    async function fetchData() {
      const res = await getStudentClassroomInfo(classroomId).then((res) => {
        console.log(res);
        setClassroomInfoData(res);
      });
    }
    fetchData();
  };

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
      <main>
        <div>Loading... please wait</div>
      </main>
    );
  }

  if (!userRole) {
    return (
      <main className="flex items-center justify-center h-screen">
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
    return (
      <main>
        <div className="flex justify-between items-center mx-10 my-5">
          <h3>Classroom Panel</h3>
          <CreateClassroom setIsClassCreated={setIsClassCreated} />
        </div>
        <div className="flex">
          <DisplayClassroomLists
            classroomListData={classroomListData}
            onSelectClassroom={handleClassroomClick}
          />
          <div className="w-full h-full">
            <DisplayClassroomInfo
              classroomInfoData={classroomInfoData}
              selectedClassroom={selectedClassroom}
              setIsStudentAdded={setIsStudentAdded}
            />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div>
          {/* Displaying all the classrooms a student is in */}
          <h3>Your Classrooms</h3>
          {/* Must create another one as classroom Id gets undefined as the Id is not teacherId as they are different because this is for students*/}
          <DisplayClassroomLists
            classroomListData={classroomListData}
            onSelectClassroom={handleClassroomClick}
          />
          <div className="w-full h-full">
            {/* Displaying detailed information about the selected classroom */}
            <DisplayClassroomInfo
              classroomInfoData={classroomInfoData}
              selectedClassroom={selectedClassroom}
              setIsStudentAdded={setIsStudentAdded}
            />
          </div>
        </div>
      </main>
    );
  }
}
