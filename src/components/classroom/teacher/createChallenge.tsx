/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createData } from "@/firebase/crud";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { UserAuth } from "@/app/context/firebaseContext";
import { Timestamp, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useToast } from "../../ui/use-toast";
import { db } from "@/firebase/config";
const challengeSchema = z.object({
  title: z.string().min(3, { message: "Title is required." }),
  challengeText: z.string().min(1, { message: "Challenge text is required." }),
});

export function CreateChallengeButton({ link }: { link: string }) {
  const [challengetext, setChallengeText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const auth = UserAuth();
  const { toast } = useToast();

  const handleChallengeTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChallengeText(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = challengeSchema.safeParse({
      title,
      challengeText: challengetext,
    });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    const creatorId = auth.user?.uid;

    const objectData = {
      ...validationResult.data,
      teacherId: creatorId,
      createdAt: Timestamp.now(),
    };

    console.log(objectData);
    // await createData("challenges", objectData);
    const q = query(collection(db, "classrooms"), where("link", "==", link));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first matching document
      const classroomDoc = querySnapshot.docs[0];

      // Update the students array with the user's details
      await updateDoc(classroomDoc.ref, {
        challenges: arrayUnion(objectData),
      });
      console.log("Successfully joined the class");
    } else {
      console.log("Invalid class link");
    }
    toast({
      title: "You successfully create a challenge",
      description:
        "Created a challenge on classroom of name CHANGE THIS LATER ",
    });

    console.log("Challenge Text:", challengetext);
    console.log("Title:", title);
    setChallengeText("");
    setTitle("");
    setError(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Challenge</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a challenge</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Challenge Text
              </Label>
              <Input
                id="challengetext"
                placeholder="Challenge Text"
                value={challengetext}
                onChange={handleChallengeTextChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}