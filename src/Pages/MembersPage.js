import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import MemberCard from "../Components/MemberCard";

const MembersPage = () => {
  return (
    <>
      <NavBar />
      <>
        <div className="w-screen min-h-screen flex flex-col items-center">
          <h1 className="text-5xl mt-24 mb-10">운영진</h1>
          <div className="flex flex-row gap-4">
            <MemberCard name={"이 모씨"} number={19} position={"회장"} description={"오..."} />
            <MemberCard name={"윤 모씨"} number={21} position={"부회장"} description={"오....?"} />
          </div>
        </div>
      </>
    </>
  );
};

export default MembersPage;
