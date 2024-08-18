// Footer.js

import React from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import logo from "../Images/logo.webp";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
const Footer = () => {
  const render = () => {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Primitive Contact</h2>
              <p className="md:text-sm hidden md:block ">
                천안시 서북구 천안대로 1223-24 공주대학교 학생회관 315호
              </p>
            </div>
            <div className="flex">
              <a
                href="https://www.instagram.com/primitive_knu/"
                target="_blank"
                className="text-gray-300 hover:text-white ml-2"
                rel="noreferrer"
              >
                <i className="fab">
                  <FaInstagram style={{ width: 24 + "px", height: 24 + "px" }} />
                </i>
              </a>
              <a
                href="https://github.com/ShipFriend0516/Primitive"
                target="_blank"
                className="text-gray-300 hover:text-white ml-2"
                rel="noreferrer"
              >
                <i className="fab">
                  <FaGithub style={{ width: 24 + "px", height: 24 + "px" }} />
                </i>
              </a>
              <a
                href="https://cafe.naver.com/primitive315"
                target="_blank"
                className="text-gray-300 hover:text-white ml-2 z-0"
                rel="noreferrer"
              >
                <i className="fab">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_403_243)">
                      <path
                        d="M18 20H2C0.9 20 0 19.1 0 18V2C0 0.9 0.9 0 2 0H18C19.1 0 20 0.9 20 2V18C20 19.1 19.1 20 18 20Z"
                        fill="#03C75A"
                      />
                      <path
                        d="M11.35 10.25L8.50002 6.19995H6.15002V13.8H8.65002V9.74995L11.5 13.8H13.85V6.19995H11.35V10.25Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_403_243">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </i>
              </a>
              <Link className="text-gray-300 hover:text-white ml-2 z-0" to={"/notice"}>
                <FaCircleInfo />
              </Link>
            </div>
          </div>
          <hr className="my-4 border-gray-600" />
          <p className="text-center relative">
            Copyright© 2024 Primitive. All rights reserved.{" "}
            <span className="absolute right-0 text-gray-800 md:text-xs hidden md:block">
              Special Thanks.... Yungang
            </span>
          </p>
        </div>
      </footer>
    );
  };

  const designedRender = () => {
    return (
      <footer className="footer w-full h-40">
        <div className="inline-flex items-center gap-2">
          {/* <div className=" w-10 h-10 overflow-hidden rounded-full">
            <img src={logo} alt="프리미티브 로고" className="grayscale" />
          </div> */}
        </div>
        <div className="flex justify-center items-center gap-2">
          <a
            href="https://www.instagram.com/primitive_knu/"
            target="_blank"
            className="text-gray-300 hover:text-gray-600"
            rel="noreferrer"
          >
            <i className="fab">
              <FaInstagram style={{ width: 24 + "px", height: 24 + "px" }} />
            </i>
          </a>
          <a
            href="https://github.com/ShipFriend0516/Primitive"
            target="_blank"
            className="text-gray-300 hover:text-gray-600"
            rel="noreferrer"
          >
            <i className="fab">
              <FaGithub style={{ width: 24 + "px", height: 24 + "px" }} />
            </i>
          </a>

          <Link className="text-gray-300 hover:text-gray-600" to={"/notice"}>
            <FaCircleInfo style={{ width: 24 + "px", height: 24 + "px" }} />
          </Link>
        </div>
        <hr className="w-4/5 inset-2 h-2 border-gray-300" />
        <p className="text-center relative text-sm">
          © 2024 Primitive. All rights reserved.{" "}
          <span className="absolute right-0 text-gray-800 text-xs hidden md:block text-transparent">
            Special Thanks.... Yungang
          </span>
        </p>
      </footer>
    );
  };
  return designedRender();
};

export default Footer;
