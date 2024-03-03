import { db } from "@/firebase/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export async function AddStudentToClassroom(
  classroomId: string,
  students: any
) {
  const washingtonRef = doc(db, "classrooms", classroomId);

  await updateDoc(washingtonRef, {
    students: arrayUnion(students),
  });
}

// await updateData("code","name","hi",{
//   "ssk": "11233"
// })

// await updateData("classrooms", "id", classroomId, {
//   students: arrayUnion(students),
// });
