import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="brainy-gradient min-h-screen w-full">
      <Navbar />
      <Hero />
    </div>
  );
}
