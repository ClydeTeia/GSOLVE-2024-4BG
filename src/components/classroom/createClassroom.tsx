/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
import { Timestamp } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomString } from '../../../utils/generateLink'

type Props = {};

const classroomSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required." })
    .max(30, { message: "Maximum is 30" }),
  description: z
    .string()
    .min(3, { message: "Description text is required." })
    .max(250, { message: "Maximum is 250" }),
});

function CreateClassroom({ }: Props) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const auth = UserAuth();

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = classroomSchema.safeParse({
      name,
      description,
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
      link: generateRandomString(8)
    };

    console.log(objectData);
    await createData("classrooms", objectData);
    toast({
      title: "You successfully create a classroom",
      description: "Created a class with name of " + name,
    });

    console.log("Description :", description);
    console.log("name: ", name);
    setDescription("");
    setName("");
    setError(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E8F3F1] p-0 h-32 w-36 group flex flex-col border border-[#77baac] rounded-md shadow-md hover:bg-[#66BAA8] ">
          <div className="flex group-hover:text-3xl text-2xl group-hover:animate-pulse transition-all h-3/4 items-center justify-center w-full">
            <div className="w-10 h-10 border group-hover:border-[#00A98B] border-[#66BAA8] flex justify-center items-center ">
              <div className="-translate-y-0.5 text-black">+</div>
            </div>
          </div>
          <Separator className="bg-[#77baac]" />
          <div className="bg-white rounded-b-md w-full h-1/4 font-semibold flex justify-center items-center text-black">
            Create Class
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Classroom</DialogTitle>
          <DialogDescription>
            Create classroom here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                value={name}
                onChange={handleTitleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
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
    </Dialog>
  );
}

export default CreateClassroom;
