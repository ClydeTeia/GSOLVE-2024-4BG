"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { DropdownMenuButton } from "./dropDownBtn";
import { readData } from "@/firebase/crud";
import { UserAuth } from "@/app/context/firebaseContext";

type Props = {};

// const classListData = [
//   {
//     id: 1,
//     name: "ASL",
//     description: "For Begineers",
//   },
//   {
//     id: 2,
//     name: "ASL 101",
//     description: "Basic ASL",
//   },
//   {
//     id: 3,
//     name: "Intermediate ASL",
//     description: "Grade 3 ASL",
//   },
// ];

interface ClassListType {
  name: string;
  description: string;
  createdAt: string;
  teacherId: string;
}

function TeacherClassList({}: Props) {
  const [classListData, setClassListData] = useState<ClassListType[]>([]);

  const user = UserAuth().user;
  const userId = user!.uid;

  useEffect(() => {
    async function fetchData() {
      await fetchDataClassList();
    }
    fetchData();
  }, []);

  const fetchDataClassList = async () => {
    console.log(userId);
    try {
      if (userId) {
        const res = await readData("classrooms", "teacherId", user!.uid);
        if (!res) throw Error;
        console.log(res);
        setClassListData(res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="text-black grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2  gap-5">
      {classListData &&
        classListData.map((classList) => (
          <Button
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
                    src={"/people.png"}
                    alt={"group icon"}
                    width={24}
                    height={24}
                  ></Image>
                </div>

                <div>Members {3}</div>
              </div>

              <div>
                <DropdownMenuButton />
              </div>
            </div>
          </Button>
        ))}
    </div>
  );
}

export default TeacherClassList;
