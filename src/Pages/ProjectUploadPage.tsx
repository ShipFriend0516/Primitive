import React, {
  ChangeEvent,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import NavBar from "../Components/common/NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactQuill, { ReactQuillProps } from "react-quill";
import DeltaStatic from "quill";

import { CiImageOn } from "react-icons/ci";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";

type ReactQuillWithRefProps = ReactQuillProps & {
  forwardedRef: RefObject<ReactQuill>;
};

const ReactQuillWithRef = forwardRef<ReactQuill, ReactQuillWithRefProps>((props, ref) => {
  const { forwardedRef, ...rest } = props;

  useImperativeHandle(ref, () => forwardedRef.current!);

  return <ReactQuill ref={forwardedRef} {...rest} />;
});

const ProjectUploadPage = () => {
  // 상태관리
  const [author, setAuthor] = useState<User | null>();
  const [projectName, setProjectName] = useState("");
  const [projectIntro, setProjectIntro] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantsInput, setParticipantsInput] = useState("");
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const [otherLink, setOtherLink] = useState("");

  // Editor
  const editorRef = useRef<ReactQuill>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // UI 상태
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isEdit, setIsEdit] = useState(false);
  const [isGithubInvalid, setIsGithubInvalid] = useState(false);
  const [isOtherInvalid, setIsOtherInvalid] = useState(false);

  const navigate = useNavigate();

  // 이펙트
  useEffect(() => {
    // 수정 모드일 때
    // 추가로 글 소유자인지 검증하고 아니면 내보내기
    getProject();
  }, [id]);

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

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.setContents(initialContents);
    }
  }, [editorRef.current]);

  const initialContents = [
    { insert: "프로젝트 이름\n", attributes: { header: 1 } },
    // { insert: "프로젝트 개요\n", attributes: { header: 2 } },
    // { insert: "- 설명: 프로젝트의 목적과 주요 기능을 간략히 설명합니다.\n" },
    // { insert: "- 기술 스택: 사용된 주요 기술(프레임워크, 라이브러리 등)을 나열합니다.\n" },
    // { insert: "- 배포 링크: (있는 경우) 프로젝트의 라이브 데모 링크를 제공합니다.\n\n" },
    // { insert: "주요 기능\n", attributes: { header: 2 } },
    // { insert: "1. 기능 1: 기능의 간단한 설명\n" },
    // { insert: "2. 기능 2: 기능의 간단한 설명\n" },
    // { insert: "3. 기능 3: 기능의 간단한 설명\n\n" },
    // { insert: "스크린샷\n", attributes: { header: 2 } },
    // { insert: "- 프로젝트의 주요 화면이나 기능을 보여주는 스크린샷을 첨부합니다.\n\n" },
    // { insert: "설치 및 사용법\n", attributes: { header: 2 } },
    // { insert: "1. 클론: 리포지토리를 클론하는 방법" },
    // { insert: { code: "git clone https://github.com/사용자명/프로젝트명.git" } },
    // { insert: "2. 의존성 설치: 필요한 패키지를 설치하는 방법\n" },
    // { insert: { code: "npm install" } },
    // { insert: "3. 빌드 및 실행: 프로젝트를 빌드하고 실행하는 방법\n" },
    // { insert: { code: "npm start" } },
    // { insert: "\n기여 방법\n", attributes: { header: 2 } },
    // { insert: "- 기여 가이드: 프로젝트에 기여하는 방법에 대한 안내\n" },
    // { insert: "- 이슈 제출: 버그 리포트나 기능 요청 방법\n" },
    // { insert: "- 풀 리퀘스트: 코드 기여 방법\n" },
    // { insert: "\n라이선스\n", attributes: { header: 2 } },
    // { insert: "- 프로젝트에 적용된 라이선스를 명시합니다.\n" },
    // { insert: "\n연락처 정보\n", attributes: { header: 2 } },
    // { insert: "- 이메일: 프로젝트 관련 문의나 피드백을 받을 수 있는 이메일 주소\n" },
    // { insert: "- 기타 연락처: 필요시 추가 연락처 정보 (예: 트위터, 링크드인 등)\n" },
  ];

  const getProject = async () => {
    try {
      if (id) {
        const response = await getDoc(doc(db, "projects", id));
        const data = response.data();
        const auth = getAuth();
        if (data && auth.currentUser) {
          if (auth.currentUser.uid === data.authorId) {
            setProjectName(data.name);
            setProjectIntro(data.intro);
            setThumbnailUrl(data.thumbnail);
            setParticipants(data.participants);
            setTechStacks(data.techStack);
            setProjectDescription(data.description);
            setIsPrivate(data.isPrivate);
            setGithubLink(data.githubLink);
            setOtherLink(data.otherLink);
            setIsEdit(true);
          } else {
            // 글 주인이 아니야
            setIsEdit(false);
            alert("해당 프로젝트에 대한 수정 권한이 없습니다.");
            navigate("/project");
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("잘못된 접근입니다.");
    }
  };

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
      participantsCount: participants.length,
      techStack: techStacks,
      description: projectDescription,
      authorId: author.uid,
      isPrivate: isPrivate,
      githubLink: githubLink,
      otherLink: otherLink,
      createdAt: new Date().getTime(),
    };

    try {
      if (!isEdit) {
        // 새 글 작성
        await addDoc(collection(db, "projects"), projectData);
        console.log("프로젝트가 성공적으로 업로드되었습니다.");

        setProjectName("");
        setProjectIntro("");
        setProjectDescription("");
        if (editorRef.current) {
          const quillInstance = editorRef.current.getEditor();
          quillInstance.setText(""); // 빈 문자열로 설정하여 내용 초기화
        }
        setThumbnailUrl("");
        setParticipants([]);
        setParticipantsInput("");
        setTechStacks([]);
        setTechStackInput("");
        setIsPrivate(false);
        setGithubLink("");
        setOtherLink("");
        setSuccess("프로젝트 업로드 완료");
        navigate("/project");
      } else {
        // 기존 글 수정
        if (id) {
          await updateDoc(doc(db, "projects", id), projectData);
          console.log("프로젝트가 성공적으로 업로드되었습니다.");

          setProjectName("");
          setProjectIntro("");
          setProjectDescription("");
          if (editorRef.current) {
            const quillInstance = editorRef.current.getEditor();
            quillInstance.setText(""); // 빈 문자열로 설정하여 내용 초기화
          }
          setThumbnailUrl("");
          setParticipants([]);
          setParticipantsInput("");
          setTechStacks([]);
          setTechStackInput("");
          setGithubLink("");
          setOtherLink("");
          setSuccess("프로젝트 수정 완료");
          navigate("/project");
        }
      }
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      const maxSize = import.meta.VITE_FB_UPLOAD_SIZE_LIMIT * 1024 * 1024 || 5 * 1024 * 1024;

      if (!file) {
        return;
      } else {
        setThumbnailUrl("");
      }

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

      setIsUploading(true);
      const uploadedFile = uploadBytesResumable(ref(storage, savedFile), file);
      console.log(uploadedFile);

      uploadedFile.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              setError("업로드가 중단되었습니다.");
              break;
          }
        },
        (error) => console.error(error),
        async () => {
          const image_url = await getDownloadURL(ref(storage, savedFile));
          setThumbnailUrl(image_url);
        }
      );
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

  const participantsInputHandler = (e: React.KeyboardEvent) => {
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
  const techStackInputHandler = (e: React.KeyboardEvent) => {
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
          ["code-block"],
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

  const githubLinkHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const pattern = /^https?:\/\/github\.com\/[\w.-]+(?:\/[\w.-]+)?$/;
    setGithubLink(e.target.value);
    if (pattern.test(e.target.value)) {
      setError("");
      setIsGithubInvalid(false);
    } else {
      setError("깃허브 링크가 유효하지 않음");
      setIsGithubInvalid(true);
    }
  };

  const isValidUrl = (string: string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const otherLinkHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isValid = isValidUrl(e.target.value);
    setOtherLink(e.target.value);
    if (isValid) {
      setError("");
    } else {
      setError("기타 링크가 유효하지 않음");
    }
  };

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
            <div className="w-full flex flex-wrap gap-3 items-center p-1">
              <h3 className="px-2 py-1.5 bg-teal-950 text-white rounded-md">프로젝트 미공개</h3>
              <div className="checkbox-wrapper-19 flex items-center gap-3">
                <label className="flex items-center ">
                  <span
                    className={`flex-grow pl-2 pr-4 transition-all text-nowrap text-gray-500 ${
                      isPrivate ? "w-40" : "w-20"
                    }`}
                  >
                    {isPrivate ? "회원만 볼 수 있습니다." : "전체 공개"}
                  </span>
                  <input
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    type="checkbox"
                    id="cbtest-19"
                    checked={isPrivate}
                  />
                  <label className={`check-box`} htmlFor="cbtest-19" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col col2 w-full md:w-1/2">
            <div
              className="rounded-sm overflow-hidden w-full image h-full bg-gray-100 flex justify-center items-center object-cover aspect-video cursor-pointer hover:bg-gray-200 border-dotted border-4"
              onClick={() => {
                if (inputRef.current) inputRef.current.click();
              }}
            >
              {thumbnailUrl ? (
                <img src={thumbnailUrl} className="object-cover" />
              ) : (
                <>
                  <div className="text-3xl w-full flex flex-col justify-center items-center gap-3">
                    <CiImageOn />
                    {isUploading && (
                      <>
                        <div className="progress">
                          <span className="bar" style={{ width: `${progress}%` }}></span>
                        </div>
                        <div className="text-sm mt-0.5 font-bold">Upload in Progress..</div>
                      </>
                    )}
                  </div>
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
        <hr className="my-2" />
        {/*  */}
        <div className="flex gap-1 justify-between">
          <div className="w-1/2 flex flex-wrap gap-3 items-center p-1 ">
            <h3 className="px-2 py-1.5 bg-black text-white rounded-md">Github Repository</h3>
            <input
              className={`flex-1 ${isGithubInvalid ? "invalid" : "valid"}`}
              type="text"
              value={githubLink}
              onChange={githubLinkHandler}
              placeholder="프로젝트 Github 저장소 (선택)"
            />
          </div>
          <div className="w-1/2 flex flex-wrap gap-3 items-center p-1">
            <h3 className="px-2 py-1.5 bg-black text-white rounded-md">Other</h3>
            <input
              className={`flex-1`}
              type="text"
              value={otherLink}
              onChange={otherLinkHandler}
              placeholder="프로젝트 기타 링크 (선택)"
            />
          </div>
        </div>

        <div className="mb-10">
          {/* <h3 className="text-2xl mb-4 text-gray-700">
            프로젝트 세부 설명을 작성해주세요! 어떤 기술 스택을 사용했나요? 어떤 도전이 있었나요?
          </h3> */}
          <ReactQuillWithRef
            forwardedRef={editorRef}
            formats={formats}
            modules={modules}
            theme="snow"
            style={{ height: "600px", fontSize: "1.15em" }}
            value={projectDescription}
            onChange={setProjectDescription}
          />
        </div>
        {error && (
          <div className="w-full text-center text-red-500 text-lg p-2">
            오류: <span className="font-bold">{error}</span>
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
            onClick={() => navigate("/project")}
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
