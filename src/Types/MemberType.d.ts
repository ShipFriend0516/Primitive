export interface MemberCardType {
  image?: string;
  name: string;
  number: number;
  position: string;
  description: string;
  type?: "small" | null;
}

export interface MemberDataType {
  id: string;
  username: string;
  email: string;
  password?: string;
  studentYear: string;
  authority: "동아리원" | "관리자" | "회장" | "부회장";
}