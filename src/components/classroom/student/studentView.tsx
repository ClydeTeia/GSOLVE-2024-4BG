"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { UserAuth } from '@/app/context/firebaseContext'

export default function StudentView() {
  const [link, setLink] = useState<string>("");
  const { user } = UserAuth();

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('yes', user)
    try {
      // Query Firestore to find the classroom document with the provided link
      const q = query(
        collection(db, "classrooms"),
        where('link','==',link)
      );

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
        console.log('Successfully joined the class');
      } else {
        console.log('Invalid class link');
      }
    } catch (error) {
      console.error('Error joining class:', error);
    }
  };

  return (
    <main className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Class Invite Link
            </Label>
            <Input
              id="link"
              placeholder="Class Link"
              value={link}
              onChange={handleLinkChange}
              className="col-span-3"
            />
          </div>
        </div>

        <Button type="submit">Join</Button>

      </form>
    </main>
  )
}