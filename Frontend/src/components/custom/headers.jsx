import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


function Header() {
  const userInfo = localStorage.getItem("user");
  



  const createNew = () =>{

  }

  return (
    <div className="flex justify-between items-center px-4 shadow-md py-2">
      <img src="/Srinus.png" className="w-20 h-12 rounded-full mt-2" />
      
        
      
    </div>
  );
}

export default Header;
