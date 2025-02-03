import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";

export const getLikesCount = async (projectId: string) => {
  try {
    const likesRef = await getDocs(
      query(collection(db, "likes"), where("projectId", "==", projectId)),
    );

    return likesRef.docs.length || 0;
  } catch (error) {
    console.error(error);
  }
};
