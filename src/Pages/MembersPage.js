import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import MemberCard from "../Components/MemberCard";
import Footer from "../Components/Footer";
import jeongwoo from "../Images/jeongwoo.webp";
import gaeun from "../Images/gaeun.webp";
import jinseong from "../Images/jinseong.webp";
import { GoCheckCircle } from "react-icons/go";

const MembersPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <>
        <div className=" max-w-7xl mx-auto w-screen pb-24 flex flex-col items-center ">
          <h1 className="md:text-5xl text-3xl font-bold mt-24 mb-10">운영진</h1>
          <div className="flex  gap-4 md:flex-row flex-col mb-24">
            <MemberCard
              name={"곽민정"}
              number={22}
              position={"회장"}
              description={"안녕하세요 PRIMITIVE 22대 회장 곽민정입니다."}
            />
            <MemberCard
              name={"이찬규"}
              number={20}
              position={"부회장"}
              description={"안녕하세요 PRIMITIVE 부회장 20학번 이찬규입니다!"}
            />
          </div>

          <div className="bg-white  border shadow-md p-4 rounded-md flex flex-col">
            <h3 className="text-center text-2xl py-1.5 ">
              <span className="inline-flex gap-2 leading-6">
                <GoCheckCircle />
                만든 사람들
              </span>
            </h3>
            <hr />
            <div className="flex justify-between gap-3 text-black md:px-4 px-2 py-2">
              <div className="creditMember flex flex-col bg-white rounded-md p-3 gap-0.5">
                <img src={jeongwoo} alt="서정우" />
                <span>서정우</span>
                <p>프론트엔드</p>
              </div>
              <div className="creditMember flex flex-col bg-white rounded-md p-3 gap-0.5">
                <img src={jinseong} alt="이진성" />
                <span>이진성</span>
                <p>백엔드 개발 (예정)</p>
              </div>
              <div className="creditMember flex flex-col bg-white rounded-md p-3 gap-0.5">
                <img src={gaeun} alt="윤가은" />
                <span>윤가은</span>
                <p className="special">Special Thanks</p>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MembersPage;
