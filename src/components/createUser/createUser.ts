import { createData, readData } from "@/firebase/crud";
import { User } from "firebase/auth";

export async function createUser(user: User) {
  const userId = user?.uid

  // Check if user with the same ID already exists
  const existingUser = await readData("users", "userId", userId);
  console.log(existingUser, "existingUser");

  if (!existingUser) {
    createData("users", {
      email: user?.email,
      username: user?.displayName,
      userId: userId,
    });
  } else {
    console.log(`User with ID ${userId} already exists.`);
  }
}
