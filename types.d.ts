type MemberProp = {
  id: string;
  name: string;
};

type ChallengeProp = {
  title: string;
  createdAt: string;
  teacherId: string;
  challengeText: string;
};

// classroom/page.tsx
type UserRoleProp = {
  userRole: "student" | "teacher" | null;
};
