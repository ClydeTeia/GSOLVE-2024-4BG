"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { DropdownMenuButton } from "../dropDownBtn";
import { readData } from "@/firebase/crud";
import { UserAuth } from "@/app/context/firebaseContext";
import Link from "next/link";

export interface ClassListType {
  name: string;
  description: string;
  createdAt: string;
  teacherId: string;
  link: string;
}

function StudentClassList({classrooms}: {classrooms: ClassListType[]}) {
  return (
    <div className="text-black grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2  gap-5">
      {classrooms &&
        classrooms.map((classList) => (
          <Link
            href={`classroom/${classList.link}`}
            key={classList.createdAt}
            className="group hover:bg-[#77baac] bg-white text-black p-0 w-full h-32 flex flex-col border-[#77baac] border shadow-md"
          >
            <div className="h-2/3 flex flex-col w-full justify-evenly items-center">
              <p>{classList.name}</p>
              <p className="text-xs">{classList.description}</p>
            </div>
            <Separator className="w-full h-0.5 bg-[#77baac]" />
            <div className="flex bg-white hover:bg-white  px-3 items-center h-1/3 text-center w-full flex-row justify-between rounded-b-md">
              <div className="flex justify-center items-center gap-1">
                <div>
                  <Image
                    src={"/icons/people.png"}
                    alt={"group icon"}
                    width={24}
                    height={24}
                  ></Image>
                </div>

                <div>Members {3}</div>
              </div>

              <div>
                <DropdownMenuButton classroom={classList} />
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default StudentClassList;
