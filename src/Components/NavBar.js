import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  const To = styled.li`
    font-size: 1.1em;
    padding: 12px 12px;
    transition: 0.2s;
    list-style: none;
    &:hover {
      cursor: pointer;
      color: gray;
    }
  `;

  const navigate = useNavigate();

  return (
    <div className="w-screen h-14 fixed bg-gray-950 z-10 text-white flex flex-row gap-5 justify-between border-b-gray-50">
      <>
        <To>Primitive</To>
        {/* <img src="" alt="logo" /> */}
      </>
      <ul className="flex flex-row">
        <To
          onClick={() => {
            navigate("/");
          }}
        >
          홈
        </To>
        <To>소개</To>
        <To
          onClick={() => {
            navigate("/project");
          }}
        >
          프로젝트
        </To>
        <To>운영진</To>
      </ul>
    </div>
  );
};

export default NavBar;
