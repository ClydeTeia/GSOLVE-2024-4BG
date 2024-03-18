"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/firebaseContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  return (
    <div className="block">
      <div className="h-16 w-full border-b-2 flex items-center justify-between px-5 p-2">
        <div>
          <ul className="flex gap-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/classroom">Classroom</Link>
            </li>
            <li>
              <Link href="/playground">Playground</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <ul className="flex">
            <li className="p-2">Hello {user.displayName}</li>
            <Button
              variant={"destructive"}
              onClick={() => {
                logOut();
              }}
            >
              Sign Out
            </Button>
          </ul>
        ) : (
          <ul className="flex">
            <li
              className="p-2 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </li>
            <li
              className="p-2 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Signup
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
