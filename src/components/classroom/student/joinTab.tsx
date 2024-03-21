"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/app/context/firebaseContext";
import { joinClassroom } from "../../../../utils/classroom/joinClassroom";

export default function JoinTab() {
  const [link, setLink] = useState<string>("");
  const { user } = UserAuth();

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("yes", user);
    joinClassroom(link, user);
  };

  return (
    <main className="flex items-center bg-white justify-center h-full w-full">
      <form onSubmit={handleSubmit}>
        <div className="gap-4 py-4 flex">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right text-lg font-semibold"
            >
              Enter Class Code
            </Label>
            <Input
              id="link"
              placeholder="Class Code"
              value={link}
              onChange={handleLinkChange}
              className="col-span-2"
            />
            <Button type="submit">Join</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
