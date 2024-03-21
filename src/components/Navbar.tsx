"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/firebaseContext";
import { Button } from "./ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useState } from "react";

export const colorVariants = {
  none: 'text-black',
  student: 'text-blue-500',
  teacher: 'text-green-500'
};

export default function Navbar() {
  const [role, setRole] = useState<"teacher" | "student" | "none">("none");
  const { user, logOut } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Get the user's data from Cloud Firestore
        const userDoc = await getDoc(doc(db, "users", user!.uid));

        // User data exists, retrieve the role
        const userData = userDoc.data();
        console.log("role is", userData);
        setRole(userData!.role)
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, [user])

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
        {user && role !== "none" ? (
          <ul className="flex">
            <li className="p-2">
              Hello, {' '}
              <span className={`${colorVariants[role]}`}>
                {user.displayName}
              </span>
            </li>
            <Button
              variant={"destructive"}
              onClick={() => {
                router.push("/");
                setTimeout(() => {
                  logOut();
                }, 600);
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
