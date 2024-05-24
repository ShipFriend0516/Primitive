import React, { useEffect, useMemo, useRef, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ReactQuill from "react-quill";

const ProjectUploadPage = () => {
  // 상태관리
  const [author, setAuthor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectIntro, setProjectIntro] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantsInput, setParticipantsInput] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [techStackInput, setTechStackInput] = useState("");
  const editorRef = useRef(null);

  const inputRef = useRef(null);

  // UI 상태
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // 이펙트
  useEffect(() => {
    // 현재 로그인한 사용자 정보를 가져옵니다.
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setAuthor(user);
      } else {
        setAuthor(null);
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    if (!projectName.trim()) {
      setError("프로젝트 이름을 입력해주세요");
      return false;
    }
    if (!projectIntro.trim()) {
      setError("프로젝트 소개를 입력해주세요");
      return false;
    }
    if (participants.length === 0) {
      setError("프로젝트 참여자를 1명 이상 입력해주세요");
      return false;
    }
    if (techStacks.length === 0) {
      setError("프로젝트 테크 스택을 1개 이상 입력해주세요");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!author) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
    setError("");
    setSuccess("");
    if (!validateForm()) {
      console.error("유효성 검사 통과 실패");
      return;
    }

    const projectData = {
      name: projectName,
      intro: projectIntro,
      thumbnail: thumbnailUrl,
      participants: participants,
      techStack: techStacks,
      description: projectDescription,
      authorId: author.uid,
      createdAt: new Date().getTime(),
    };

    try {
      await addDoc(collection(db, "projects"), projectData);
      console.log("프로젝트가 성공적으로 저장되었습니다.");
      // 폼 초기화
      setProjectName("");
      setProjectIntro("");
      setProjectDescription("");
      setThumbnailUrl("");
      setParticipants([]);
      setParticipantsInput("");
      setTechStacks([]);
      setTechStackInput("");

      setSuccess("프로젝트 업로드 완료");
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const maxSize = import.meta.VITE_FB_UPLOAD_SIZE_LIMIT * 1024 * 1024 || 5 * 1024 * 1024;

      if (file.size > maxSize) {
        setError("파일크기는 5MB 이하여야합니다.");
        e.preventDefault();
        return;
      }
      const lastDotIndex = file.name.lastIndexOf(".");
      if (lastDotIndex === -1) {
        setError("잘못된 이미지입니다.");
        return;
      }
      const savedFile = `project-images/${projectName}${getTimeStamp()}${file.name.slice(
        lastDotIndex
      )}`;

      const uploadedFile = await uploadBytes(ref(storage, savedFile), e.target.files[0]);
      console.log(uploadedFile);
      const image_url = await getDownloadURL(ref(storage, savedFile));
      setThumbnailUrl(image_url);
    } catch (err) {
      console.error(err);
    }
  };

  const getTimeStamp = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const monthString = month < 10 ? "0" + month : month; // 한 자리 숫자인 경우 앞에 0을 붙입니다.
    const day = now.getDate();
    const dayString = day < 10 ? "0" + day : day; // 한 자리 숫자인 경우 앞에 0을 붙입니다.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${now.getFullYear()}${monthString}${dayString}${hour}${minute}${second}`;
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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: ["red"],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "background",
    "size",
    "h1",
  ];

  return (
    <section className="page">
      <NavBar />
      <div className="max-w-5xl w-full mt-16 mb-20 mx-auto p-5 md:p-5 project-upload">
        <h1 className="text-2xl md:text-3xl font-bold">프로젝트 업로드</h1>
        <p className="md:text-xl">프로젝트를 마치셨나요? 🎉 업로드해 모두에게 공개해봅시다! </p>
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
          <div className="flex flex-col col1 w-full md:w-1/2">
            <div>
              <label>
                <input
                  className="w-full font-bold"
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
                  maxLength={150}
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
                      ${index % 2 === 0 && "bg-indigo-50"}
                      ${index % 2 === 1 && "bg-indigo-100"}
                      hover:bg-indigo-200
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
                      ${index % 2 === 0 && "bg-emerald-50"}
                      ${index % 2 === 1 && "bg-emerald-100"}
                      hover:bg-emerald-200
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
          <div className="flex flex-col col2 w-full md:w-1/2">
            <div
              className="rounded-sm overflow-hidden w-full image h-full bg-gray-100 flex justify-center items-center object-cover aspect-video cursor-pointer hover:bg-gray-200"
              onClick={() => inputRef.current.click()}
            >
              {thumbnailUrl ? (
                <img src={thumbnailUrl} className="object-cover" />
              ) : (
                <>
                  <div className="text-lg">썸네일 추가</div>
                </>
              )}
              <input
                ref={inputRef}
                className="hidden"
                type={"file"}
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                alt={projectName}
              />
            </div>
          </div>
        </div>
        {/*  */}
        <hr className="my-2" />
        <div className="mb-10">
          <h3 className="text-xl mb-3">프로젝트 세부 설명</h3>
          {/* <Editor
            initialValue="프로젝트 세부 설명을 마크다운으로 작성하세요!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          /> */}
          <ReactQuill
            forwardedRef={editorRef}
            formats={formats}
            modules={modules}
            theme="snow"
            style={{ height: "600px", fontSize: "1.15em" }}
            onChange={setProjectDescription}
          />
        </div>
        {error && (
          <div className="w-full text-center text-red-500 text-lg p-2">
            잘못된 형식: <span className="font-bold">{error}</span>
          </div>
        )}
        {success && (
          <div className="w-full text-center text-green-500 text-lg p-2">
            성공: <span className="font-bold">{success}</span>
          </div>
        )}
        <div className="flex justify-center gap-4 py-10 md:py-3">
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
