import React, { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProjectUploadPage = () => {
  const [projectName, setProjectName] = useState("");
  const [projectIntro, setProjectIntro] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantsInput, setParticipantsInput] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [techStackInput, setTechStackInput] = useState("");
  const editorRef = useRef();

  const navigate = useNavigate();

  const handleSave = async () => {
    const markdownContent = editorRef.current.getInstance().getMarkdown();

    const projectData = {
      name: projectName,
      intro: projectIntro,
      thumbnail: thumbnailUrl,
      participants: participants,
      techStack: techStacks,
      description: markdownContent,
      createdAt: new Date(),
    };

    try {
      // await firestore.collection("projects").add(projectData);
      await addDoc(collection(db, "projects"), projectData);
      console.log("프로젝트가 성공적으로 저장되었습니다.");
      // 폼 초기화
      setProjectName("");
      setProjectIntro("");
      setThumbnailUrl("");
      setParticipants([]);
      setParticipantsInput("");
      setTechStacks([]);
      setTechStackInput("");
      editorRef.current.getInstance().setMarkdown("");
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  // 참여 인원 입력 핸들러

  const participantsInputHandler = (e) => {
    if ((e.code === "Comma" || e.code === "Enter") && participantsInput) {
      e.preventDefault();
      if (participants.includes(participantsInput.trim())) {
        // 중복
      } else if (!e.nativeEvent.isComposing) {
        const tag = participantsInput.slice();

        setParticipants([...participants, tag.trim()]);
        setParticipantsInput("");
      } else if (!e.nativeEvent.isComposing && e.code === "Comma") {
      }
    } else if (e.code === "Backspace" && !participantsInput) {
      setParticipants([...participants.slice(0, -1)]);
    }
  };

  // 테크 스택 입력 핸들러
  const techStackInputHandler = (e) => {
    if ((e.code === "Comma" || e.code === "Enter") && techStackInput) {
      e.preventDefault();
      if (techStacks.includes(techStackInput.trim())) {
        // 중복
      } else if (!e.nativeEvent.isComposing) {
        const tag = techStackInput.slice();

        setTechStacks([...techStacks, tag.trim()]);
        setTechStackInput("");
      } else if (!e.nativeEvent.isComposing && e.code === "Comma") {
      }
    } else if (e.code === "Backspace" && !techStackInput) {
      setTechStacks([...techStacks.slice(0, -1)]);
    }
  };

  return (
    <section className="page">
      <NavBar />
      <div className="max-w-5xl w-full mt-16 mb-20 mx-auto p-1 md:p-5 project-upload">
        <h1 className="text-3xl font-bold">프로젝트 업로드</h1>
        <p className="text-xl ">🎉 프로젝트를 마치셨나요? 업로드해 모두에게 공개해봅시다!</p>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col col1 w-1/2">
            <div>
              <label>
                <input
                  className="w-full"
                  type="text"
                  value={projectName}
                  placeholder="프로젝트 제목"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  className="w-full"
                  type="text"
                  value={projectIntro}
                  placeholder="프로젝트 한 줄 요약"
                  onChange={(e) => setProjectIntro(e.target.value)}
                />
              </label>
            </div>
            <div className="w-full">
              <div className="w-full inline-flex flex-wrap gap-3 items-center p-1">
                <span className="px-2 py-1.5 bg-indigo-800 text-white rounded-md">
                  프로젝트 참여자
                </span>
                {participants.map((participant, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setParticipants(participants.filter((_, idx) => index !== idx));
                    }}
                    className={`cursor-pointer px-2 py-1.5 bg-indigo-100 rounded-md gap-2 tagAnimation text-nowrap
                      ${index % 4 === 0 && "bg-indigo-50"}
                      ${index % 4 === 1 && "bg-indigo-100"}
                      `}
                  >
                    {participant}
                  </span>
                ))}

                <input
                  onKeyDown={(e) => participantsInputHandler(e)}
                  type="text"
                  value={participantsInput}
                  onChange={(e) => setParticipantsInput(e.target.value)}
                  placeholder="참여자를 입력하세요"
                />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-wrap gap-3 items-center p-1">
                <h3 className="px-2 py-1.5 bg-emerald-900 text-white rounded-md">
                  사용한 기술스택
                </h3>
                {techStacks.map((tech, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setTechStacks(techStacks.filter((_, idx) => index !== idx));
                    }}
                    className={`cursor-pointer px-2 py-1.5 bg-emerald-100 rounded-md gap-2 tagAnimation text-nowrap
                      ${index % 4 === 0 && "bg-emerald-50"}
                      ${index % 4 === 1 && "bg-emerald-100"}
                      `}
                  >
                    {tech}
                  </span>
                ))}

                <input
                  onKeyDown={(e) => techStackInputHandler(e)}
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="프로젝트 주요 기술 스택"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col col2 w-1/2">
            <div className="w-full image h-full bg-gray-200 flex justify-center items-center object-cover aspect-video cursor-pointer hover:bg-gray-300">
              <div>이미지 추가</div>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h3 className="text-xl mb-3">프로젝트 세부 설명</h3>
          <Editor
            initialValue="프로젝트 세부 설명을 마크다운으로 작성하세요!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          />
        </div>
        <div className="flex justify-center gap-4 p-3">
          <button
            className="px-5 py-2 bg-white text-black border "
            onClick={() => navigate("/mypage")}
          >
            돌아가기
          </button>
          <button
            className="px-5 py-2 bg-indigo-950 text-white border-transparent"
            onClick={handleSave}
          >
            업로드
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectUploadPage;
