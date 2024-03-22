type MemberProp = {
  id: string;
  name: string;
};

type ChallengeProp = {
  id: string;
  name: string;
  students: any[] | null;
};

// classroom/page.tsx
type UserRoleProp = {
  userRole: "student" | "teacher" | null;
};
