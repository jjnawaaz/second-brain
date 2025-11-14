"use client";

import { LogIn, LogOut, Menu, Pencil, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuthStore, useMenuStore } from "../store/userStore";
import { useRouter } from "next/navigation";

export default function MobileNavBar() {
  const { sidebarMobileOpen, updateSideBarMobileOpen, updateSideBarOpen } =
    useMenuStore();
  const { isAuthenticated, logout, username } = useAuthStore();
  const router = useRouter();
  function handleButtonClick(result: boolean) {
    updateSideBarOpen(false);
    updateSideBarMobileOpen(result);
  }

  async function handleLogout() {
    updateSideBarMobileOpen(false);
    const response = await logout();
    if (response?.success) {
      router.push("/");
    }
  }

  return (
    <>
      <div className="">
        {sidebarMobileOpen ? (
          <X onClick={() => handleButtonClick(false)} />
        ) : (
          <Menu onClick={() => handleButtonClick(true)} />
        )}

        <AnimatePresence>
          {sidebarMobileOpen && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed shadow-2xl backdrop-blur-xl rounded-b-3xl h-auto w-1/2 right-0 top-16 z-50"
            >
              <div className="flex flex-col items-center justify-center py-6">
                {!isAuthenticated && (
                  <div>
                    <div className="py-5 flex-center justify-center gap-2 font-semibold w-44 z-[9999]">
                      <Link
                        href={"/login"}
                        className="flex-center gap-2 cursor-pointer"
                        onClick={() => handleButtonClick(false)}
                      >
                        Login
                        <LogIn className="md:size-4 lg:size-5" />
                      </Link>
                    </div>
                    <div className="py-5 flex-center justify-center gap-2 font-semibold  w-44 z-[9999]">
                      <Link
                        href={"/signup"}
                        className="flex-center gap-2 cursor-pointer"
                        onClick={() => handleButtonClick(false)}
                      >
                        Signup
                        <Pencil className="md:size-3 lg:size-4" />
                      </Link>
                    </div>
                  </div>
                )}
                {isAuthenticated && (
                  <>
                    <div className="py-5 flex-center justify-center gap-2 font-semibold  w-44 z-[9999]">
                      <Link
                        href={"/dashboard"}
                        className="flex-center gap-2 cursor-pointer"
                        onClick={() => {
                          handleButtonClick(false);
                        }}
                      >
                        Dashboard
                      </Link>
                    </div>
                    <div
                      className="py-5 flex-center justify-center gap-2 font-medium text-md w-44 z-[9999]"
                      onClick={handleLogout}
                    >
                      {username}
                      <LogOut className="md:size-3 lg:size-4" />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
