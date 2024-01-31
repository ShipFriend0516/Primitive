import styled from "styled-components";

const MemberCard = ({ emoji, name, number, position, description }) => {
  const MemberCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: between;

    max-height: 540px;
    aspect-ratio: 6/9;

    border-radius: 12px;
    border: 1px solid lightgray;
    overflow: hidden;
    background-color: gray;

    h3 {
      font-size: 1.5em;
      margin: 20px 0;
      text-align: center;
    }

    div:first-child {
      height: 70%;
    }

    div:last-child {
      display: flex;
      flex-direction: column;
      padding: 24px;
      height: 30%;
      color: white;
      font-weight: bold;
    }
  `;

  return (
    <MemberCard>
      <div className="w-full bg-white text-9xl flex justify-center items-center">{emoji}</div>
      <div className="bg-slate-900 w-full">
        <span>{position}</span>
        <span className="text-2xl">
          {name} {number}기
        </span>
        <span className="text-gray-300">{description}</span>
      </div>
    </MemberCard>
  );
};

export default MemberCard;
