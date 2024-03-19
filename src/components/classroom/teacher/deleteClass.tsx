import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { ClassListType } from "./teacherClassList";

export function DeleteBtn({ classroom }: { classroom: ClassListType }) {
  async function handleDeleteClassroom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const q = query(
        collection(db, "classrooms"),
        where('link','==',classroom.link)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 rounded-sm p-1 px-2 w-full text-left text-sm">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleDeleteClassroom}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will also delete all students joined under this classroom. Are you sure you want to delete?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">
                Delete Classroom
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
