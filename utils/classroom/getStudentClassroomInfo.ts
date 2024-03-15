import { db } from "@/firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";

export async function getStudentClassroomInfo(classroomId: string) {
  try {
    const docRef = doc(db, "classrooms", classroomId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const classroomData = docSnapshot.data();

      if (classroomData && classroomData.students) {
        const students = classroomData.students;
        return students;
      } else {
        throw new Error(
          "Classroom data or students list not found in the document"
        );
      }
    } else {
      throw new Error("Classroom document not found");
    }
  } catch (error) {
    console.error("Error fetching student classroom info:", error);
    throw error;
  }
}
