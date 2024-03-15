"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/config";

import { User } from "firebase/auth"; // Make sure to import the User type from Firebase
import { createUser } from "@/components/createUser/createUser";

// Define the type for the context value
interface AuthContextValue {
  user: User | null;
  emailSignIn: (email: string, password: string) => void;
  emailSignUp: (email: string, password: string, username: string) => void;
  googleSignIn: () => void;
  logOut: () => void;
}

// Create the context with the default value
const AuthContext = createContext<AuthContextValue>({
  user: null,
  emailSignIn: () => {},
  emailSignUp: () => {},
  googleSignIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const emailSignUp = async (
    email: string,
    password: string,
    username: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("Token", token);
        if (user) {
          createUser(user);
        }
        await updateProfile(user, {
          displayName: username,
        });
        console.log(user.displayName, "has logged in");
      }
    );
  };

  const emailSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("Token", token);
        console.log("User ID Token:", token);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const token = await user.getIdToken();
      if (user) {
        createUser(user);
      }
      localStorage.setItem("Token", token);
    });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("Token");
    });
    console.log(user?.displayName, "has logged out");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, emailSignIn, emailSignUp, googleSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
