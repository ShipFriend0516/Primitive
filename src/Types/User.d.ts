export default interface User {
  id: string;
  authority?: "동아리원" | "관리자" | "회장" | "부회장";
  authorityLevel?: 0 | 1 | 3 | 2;
  email?: string;
  status?: "Active" | "Inactive";
  studentYear?: string;
  username?: string;
}
