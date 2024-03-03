import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createData } from "../../firebase/crud";
import { UserAuth } from "@/app/context/firebaseContext";

type eventChange = React.ChangeEvent<HTMLInputElement>;
type eventSubmit = React.FormEvent<HTMLFormElement>;

export function CreateClassroom({ setIsCreated }: any) {
  const user = UserAuth().user;
  const userId = user?.uid;

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    teacherId: "",
  });

  if (!userId) return null;

  const handleInputChange = (e: eventChange) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      teacherId: userId,
      students: [],
    }));
  };

  const handleSubmit = async (e: eventSubmit) => {
    e.preventDefault();
    try {
      const docId = await createData("classrooms", formData);
      console.log("Classroom created with ID:", docId);
      setFormData({
        name: "",
        subject: "",
        teacherId: "",
      });
      setIsCreated(true);
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Classroom</DialogTitle>
          <DialogDescription>
            Create your own classroom. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Classroom name:"
                value={formData.name}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject name: "
                value={formData.subject}
                className="col-span-3"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save Classroom</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
