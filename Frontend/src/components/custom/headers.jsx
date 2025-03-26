import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Header() {
  const userInfo = localStorage.getItem("user");

  const createNew = () => {};

  return (
    <div className="flex justify-between items-center px-4 shadow-md py-2">
      <img src="/Srinus.png" className="w-20 h-12 rounded-full mt-2" />
      <h2 className="text-gray-500 font-bold  sm:text-[34px] md:text-[34px] text-[24px] font-mono animate-bounce">
        Built By Srinu
      </h2>
    </div>
  );
}

export default Header;
