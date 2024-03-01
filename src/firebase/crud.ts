import { db } from "./config";
import {
  doc,
  query,
  where,
  collection,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth } from "./config";

export async function createData(
  table: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in.");
    }
    const userId = user.uid;

    const dataWithUserId = { userId, ...data };
    const docRef = await addDoc(collection(db, table), dataWithUserId);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// for testing
export async function createDocumentedData(
  table: string,
  ref: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in.");
    }
    const userId = user.uid;

    const dataWithUserId = { userId, ...data };
    const docRef = await setDoc(doc(db, table, ref), dataWithUserId);

    // await setDoc(doc(db, "cities", "new-city-id"), data);
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function readData(table: string, name: string, value: unknown) {
  try {
    const q = query(collection(db, table), where(name, "==", value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("Error reading document: ", e);
  }
}

export async function updateData(
  table: string,
  name: string,
  value: unknown,
  newData: Record<string, Partial<unknown> | undefined>
) {
  try {
    const q = query(collection(db, table), where(name, "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Update each document
      updateDoc(doc.ref, newData)
        .then(() => {
          console.log(`Successfully updated document with ID: ${doc.id}`);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function deleteData(table: string, name: string, value: unknown) {
  try {
    const q = query(collection(db, table), where(name, "==", value));

    const querySnapshot = await getDocs(q);

    // Iterate over each document in the result set
    querySnapshot.forEach((doc) => {
      // Delete each document
      deleteDoc(doc.ref)
        .then(() => {
          console.log(`Successfully deleted document with ID: ${doc.id}`);
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });
    });
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}
