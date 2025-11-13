import { Bird, File, Linkedin, X, Youtube } from "lucide-react";

interface SideBarProps {
  handleClick: (flag: boolean) => void;
}

export default function SideBar({ handleClick }: SideBarProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 left-5 top-20 backdrop-blur-lg rounded-xl h-1/2 w-1/4 md:w-1/6 flex flex-col text-white">
        <div className="flex justify-end p-4">
          <X className="size-6" onClick={() => handleClick(false)} />
        </div>
        <div className="flex flex-col justify-evenly h-full">
          <div className="flex-center gap-1 px-1 overflow-hidden">
            <div className="flex-center">
              <File className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Document</div>
          </div>
          <div className="flex-center gap-1 px-1 overflow-hidden">
            <div className="flex-center">
              <Linkedin className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Linkedin</div>
          </div>
          <div className="flex-center gap-1 px-1 overflow-hidden">
            <div className="flex-center">
              <Youtube className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Youtube</div>
          </div>
          <div className="flex-center gap-1 px-1 overflow-hidden">
            <div className="flex-center">
              <Bird className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Tweet</div>
          </div>
        </div>
      </div>
    </>
  );
}
