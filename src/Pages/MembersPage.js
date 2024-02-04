import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import MemberCard from "../Components/MemberCard";
import Footer from "../Components/Footer";

const MembersPage = () => {
  const emojis = ["🔥", "🌿", "🌱", "😁", "😎", "👍"];
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <>
        <div className=" max-w-7xl mx-auto w-screen pb-32 flex flex-col items-center">
          <h1 className="md:text-5xl text-3xl font-bold mt-24 mb-10">운영진</h1>
          <div className="flex  gap-4 md:flex-row flex-col">
            <MemberCard
              emoji={emojis[Math.floor(Math.random() * emojis.length)]}
              name={"곽민정"}
              number={22}
              position={"회장"}
              description={"오..."}
            />
            <MemberCard
              emoji={emojis[Math.floor(Math.random() * emojis.length)]}
              name={"이찬규"}
              number={20}
              position={"부회장"}
              description={"오..."}
            />
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MembersPage;
