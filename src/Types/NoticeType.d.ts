import { Timestamp } from "firebase/firestore";

interface Notice {
  id: string;
  kind: string;
  title: string;
  content: string;
  date?: Timestamp;
}

export default Notice;
