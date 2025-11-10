"use client";

import { LogIn, Menu, Pencil, X } from "lucide-react";
import { useState } from "react";

export default function MobileNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleClick() {
    setMobileOpen((prev) => !prev);
  }
  console.log(mobileOpen);
  return (
    <>
      <div>
        {mobileOpen ? (
          <X onClick={handleClick} />
        ) : (
          <Menu onClick={handleClick} />
        )}
        <div
          className={`absolute shadow-2xl border-2 border-transparent rounded-3xl h-auto w-full right-0 left-0 top-16 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="py-5 flex-center justify-center gap-2 font-semibold w-44">
              <LogIn />
              Login
            </div>
            <div className="py-5 flex-center justify-center gap-2 font-semibold  w-44">
              <Pencil />
              SignUp
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
