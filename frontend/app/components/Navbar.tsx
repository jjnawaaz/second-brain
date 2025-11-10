"use client";
import { LogIn, Pencil } from "lucide-react";
import MobileNavBar from "./MobileNavbar";
import BrainSVG from "../icons/brain";

export default function Navbar() {
  return (
    <>
      <div className="relative border-2 border-red-500 flex-center justify-between px-3 h-16 text-white">
        {/* Logo and Text  */}
        <div className="flex-center gap-2">
          <div className="">
            <BrainSVG />
          </div>
          <div className="font-bold">
            M
            <span className="text-[#abaaaa] inline-block font-extrabold">
              !
            </span>
            NDVAULT
          </div>
        </div>
        {/* Login and SignUp  */}
        <div className="hidden md:flex-center md:justify-between md:px-5 lg:px-7 lg:text-base md:text-sm md:gap-4 md:w-auto  md:font-semibold">
          <div className="flex-center gap-2">
            Login
            <LogIn className="md:size-4 lg:size-5" />
          </div>
          <div className="flex-center gap-2">
            Signup
            <Pencil className="md:size-3 lg:size-4" />
          </div>
        </div>

        {/* For Mobile  */}
        <div className="md:hidden">
          <MobileNavBar />
        </div>
      </div>
    </>
  );
}
