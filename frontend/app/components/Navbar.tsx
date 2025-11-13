"use client";
import { LogIn, Pencil } from "lucide-react";
import MobileNavBar from "./MobileNavbar";
import BrainSVG from "../icons/brain";
import Link from "next/link";
import { useAuthStore } from "../store/userStore";

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <div className="top-0 sticky shadow-2xl bg-gradient-to-r from-black to-main-color flex-center justify-between px-3 h-16 text-white z-[10000]">
        {/* Logo and Text  */}
        <div className="flex-center gap-2">
          <Link href={"/"} className="flex-center gap-2">
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
          </Link>
        </div>
        {/* Login and SignUp  */}
        {!isAuthenticated && (
          <div className="hidden md:flex-center md:justify-between md:px-5 lg:px-7 lg:text-base md:text-sm md:gap-4 md:w-auto  md:font-semibold">
            <div className="flex-center gap-2">
              <Link
                href={"/login"}
                className="flex-center gap-2 cursor-pointer"
              >
                Login
                <LogIn className="md:size-4 lg:size-5" />
              </Link>
            </div>
            <div className="flex-center gap-2">
              <Link
                href={"/signup"}
                className="flex-center gap-2 cursor-pointer"
              >
                Signup
                <Pencil className="md:size-3 lg:size-4" />
              </Link>
            </div>
          </div>
        )}
        <div className="hidden ">
          <div>Dashboard</div>
          <div>Profile</div>
        </div>
        {/* For Mobile  */}
        <div className="md:hidden">
          <MobileNavBar />
        </div>
      </div>
    </>
  );
}
