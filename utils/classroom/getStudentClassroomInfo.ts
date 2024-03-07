import { db } from "@/firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";

export async function getStudentClassroomInfo(classroomId: string) {
  const docRef = doc(db, "classrooms", classroomId);
  const docSnapshot = await getDoc(docRef);
  // const classrooms = [];

  const students = docSnapshot.data()?.students;

  return students;
}
