export default interface Comment {
  id: string;
  authorId: string;
  username: string;
  comment: string;
  profileThumbnail?: string;
  replies: Comment[];
  createdAt: number;
  updatedAt?: number;
}
