import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useState, ChangeEvent, useEffect } from "react";
import { db } from "../firebase";

interface Props {
  id: string;
  level: number;
}

const StaffsWord = ({ id, level }: Props) => {
  // Level 0 => 동아리원
  // Level 1 => 관리자
  // Level 2 => 부회장
  // Level 3 => 회장

  const [presidentWord, setPresidentWord] = useState(
    "안녕하세요 PRIMITIVE 22대 회장 곽민정입니다."
  );
  const [viceWord, setViceWord] = useState("안녕하세요 PRIMITIVE 부회장 20학번 이찬규입니다!");
  const [presidentCharCount, setPresidentCharCount] = useState(presidentWord.length);
  const [viceCharCount, setViceCharCount] = useState(viceWord.length);

  // Effect
  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    setPresidentCharCount(presidentWord.length);
  }, [presidentWord]);

  useEffect(() => {
    setViceCharCount(viceWord.length);
  }, [viceWord]);

  const getWords = async () => {
    try {
      const response = await getDocs(query(collection(db, "words")));

      const docs = response.docs.map((doc, index) => ({
        ...doc.data(),
      }));

      docs.forEach((doc) => {
        doc.level === 3 ? setPresidentWord(doc.word) : setViceWord(doc.word);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSave = async (needLevel: number, userLevel: number) => {
    try {
      if (needLevel === userLevel) {
        await setDoc(doc(db, "words", needLevel === 3 ? "president" : "vice"), {
          userId: id,
          level: needLevel,
          word: needLevel === 3 ? presidentWord : viceWord,
          createdAt: new Date().getTime(),
        });
      } else {
        alert("수정 권한이 없습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePresidentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPresidentWord(e.target.value);
    setPresidentCharCount(e.target.value.length);
  };

  const handleViceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setViceWord(e.target.value);
    setViceCharCount(e.target.value.length);
  };

  return (
    <div className="p-2">
      <h3 className="text-xl m-2">
        😎 회장의 메시지 {level === 3 && <small className="text-sm text-gray-500">수정가능</small>}
      </h3>
      <div className="relative flex items-center">
        <textarea
          onChange={handlePresidentChange}
          maxLength={35}
          className="flex-grow border rounded-md p-2 resize-none h-10"
          value={presidentWord}
        >
          안녕하세요 PRIMITIVE 22대 회장 곽민정입니다.
        </textarea>
        <span className="absolute right-2 top-2 text-sm text-gray-500">
          {presidentCharCount}/35
        </span>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onSave(3, level)}
          className="bg-black text-white px-2 py-1 rounded-md my-2"
        >
          저장
        </button>
      </div>
      <hr className="my-4" />
      <h3 className="text-xl m-2">
        😀 부회장의 메시지{" "}
        {level === 2 && <small className="text-sm text-gray-500">수정가능</small>}
      </h3>
      <div className="relative flex items-center">
        <textarea
          onChange={handleViceChange}
          maxLength={35}
          className="flex-grow border rounded-md p-2 resize-none h-10"
          value={viceWord}
        >
          안녕하세요 PRIMITIVE 부회장 20학번 이찬규입니다!
        </textarea>
        <span className="absolute right-2 top-2 text-sm text-gray-500">{viceCharCount}/35</span>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onSave(2, level)}
          className="bg-black text-white px-2 py-1 rounded-md my-2"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default StaffsWord;
