import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  // CRUD TESTS

  // await createData("code", {
  //   name: "hihello",
  //   new: "222"
  // })

  // await readData("code", "name", "hi");

  // await updateData("code","name","hi",{
  //   "ssk": "11233"
  // })

  // await deleteData("code","new","222")
  // const router = useRouter();

  return (
    <main className="flex h-full items-center justify-center bg-dot-black/[0.2] p-2">
      <div className="mx-auto text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Signify: Your Gateway to Inclusive ASL Alphabet Learning!
        </h2>
        <p className="mb-4 text-lg">
          Discover ASL alphabet letters through engaging lessons, gamified
          activities, and a typing race game. Join classrooms for collaborative
          learning, track your progress, and empower inclusivity with Signify.
        </p>
        <p className="mt-4">Start your ASL journey today! 🌟</p>
        <br />
        <Link href="/playground">
          <Button className="p-5">Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
