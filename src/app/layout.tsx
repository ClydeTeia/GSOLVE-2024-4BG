import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "./context/firebaseContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VisionX",
  description: "ASL Helper",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarHeight = 16;
  const toastHeight = 80;
  const mainContentHeight = `calc(100vh - ${navbarHeight - toastHeight}px)`;

  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className="h-screen flex flex-col">
            <div className="h-16">
              <Navbar />
            </div>
            <div className={`flex-grow ${mainContentHeight}`}>{children}</div>
          </div>
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
