interface SignupRequest {
  id: string;
  email?: string;
  password?: string;
  username?: string;
  studentYear?: string;
  status?: "approved" | "rejected" | "pending";
}
