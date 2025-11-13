import React from "react";
import Navbar from "../components/Navbar";

export default function DashBoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </>
  );
}
