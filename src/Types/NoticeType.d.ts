import { Timestamp } from "firebase/firestore";

interface Notice {
  id: string;
  category: string;
  title: string;
  content: string;
  date?: Timestamp;
}

export default Notice;
