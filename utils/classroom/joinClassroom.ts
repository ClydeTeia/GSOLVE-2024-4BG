import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { User } from "@firebase/auth";


export async function joinClassroom(link: string, user: User | null) {
  try {
    // Query Firestore to find the classroom document with the provided link
    const q = query(collection(db, "classrooms"), where("link", "==", link));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first matching document
      const classroomDoc = querySnapshot.docs[0];

      // Update the students array with the user's details
      await updateDoc(classroomDoc.ref, {
        students: arrayUnion({
          name: user?.displayName,
          email: user?.email,
        }),
      });
      console.log("Successfully joined the class");
    } else {
      console.log("Invalid class link");
    }
  } catch (error) {
    console.error("Error joining class:", error);
  }
}