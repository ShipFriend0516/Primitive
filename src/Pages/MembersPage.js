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
        <div className="w-screen pb-32 flex flex-col items-center">
          <h1 className="md:text-5xl text-3xl font-bold mt-24 mb-10">운영진</h1>
          <div className="flex flex-row gap-4">
            <MemberCard
              emoji={emojis[Math.floor(Math.random() * emojis.length)]}
              name={"심상치 않은 회장"}
              number={22}
              position={"회장"}
              description={"오..."}
            />
            <MemberCard
              emoji={emojis[Math.floor(Math.random() * emojis.length)]}
              name={"심상치 않은 부회장"}
              number={20}
              position={"부회장"}
              description={"오....?"}
            />
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MembersPage;
