import { useEffect, useRef, useState } from "react";
import { QueryDocumentSnapshot } from "firebase/firestore";

interface UseInfiniteScrollProps {
  triggerFunction: () => void;
  isLast: boolean;
  observeRef: React.RefObject<any>;
  isLoggedIn?: boolean;
}
const useInfiniteScroll = ({
  triggerFunction,
  isLast,
  observeRef,
  isLoggedIn,
}: UseInfiniteScrollProps) => {
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>();

  const option = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(async (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLast) {
        setAdditionalLoading(true);
        triggerFunction();
        setAdditionalLoading(false);
      }
    });
  }, option);

  useEffect(() => {
    if (observeRef.current) {
      observer.observe(observeRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isLoggedIn, observeRef.current, lastDoc]);

  return { additionalLoading, setAdditionalLoading, lastDoc, setLastDoc };
};

export default useInfiniteScroll;
