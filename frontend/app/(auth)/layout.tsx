import Navbar from "../components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden z-0">
        <Navbar />
        <div className="flex-1 relative overflow-hidden">{children}</div>
      </div>
    </>
  );
}
