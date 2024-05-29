export default interface Comment {
  id: string;
  authorId: string;
  username: string;
  comment: string;
  replies: Comment[];
  createdAt: number;
}
