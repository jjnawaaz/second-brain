"use client";
import { LogIn, LogOut, Pencil } from "lucide-react";
import MobileNavBar from "./MobileNavbar";
import BrainSVG from "../icons/brain";
import Link from "next/link";
import { useAuthStore, useMenuStore } from "../store/userStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, logout, username } = useAuthStore();
  const { updateSideBarMobileOpen } = useMenuStore();
  const router = useRouter();
  async function handleLogout() {
    updateSideBarMobileOpen(false);
    const response = await logout();
    if (response?.success) {
      router.push("/");
    }
  }
  return (
    <>
      <div className="top-0 sticky shadow-2xl bg-gradient-to-r from-black to-main-color flex-center justify-between px-3 h-16 text-white z-10">
        {/* Logo and Text  */}
        <div className="flex-center gap-2">
          <Link
            href={"/"}
            className="flex-center gap-2"
            onClick={() => updateSideBarMobileOpen(false)}
          >
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
        {isAuthenticated && (
          <div className="hidden md:flex-center gap-7 px-2 ">
            <div className="font-medium flex-center justify-between cursor-pointer">
              <Link href={"/dashboard"}>Dashboard</Link>
            </div>
            <div
              className="py-5 flex-center gap-2 font-extralight cursor-pointer"
              onClick={handleLogout}
            >
              {username}
              <LogOut className="md:size-4" />
            </div>
          </div>
        )}
        {/* For Mobile  */}
        <div className="md:hidden">
          <MobileNavBar />
        </div>
      </div>
    </>
  );
}
