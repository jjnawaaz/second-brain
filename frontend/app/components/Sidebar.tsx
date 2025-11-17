import { Bird, File, LibraryBig, Linkedin, X, Youtube } from "lucide-react";
import { ContentType } from "../store/userStore";

interface SideBarProps {
  handleButtonClick: (flag: boolean) => void;
  setFilterType: (val: ContentType) => void;
}

export default function SideBar({
  handleButtonClick,
  setFilterType,
}: SideBarProps) {
  function handleClick(val: ContentType) {
    setFilterType(val);
    handleButtonClick(false);
  }
  return (
    <>
      <div className="fixed inset-0 z-30 left-5 top-20 backdrop-blur-lg rounded-xl h-1/2 w-1/4 md:w-1/6 flex flex-col text-white">
        <div className="flex justify-end p-4">
          <X className="size-6" onClick={() => handleButtonClick(false)} />
        </div>
        <div className="flex flex-col justify-evenly h-full">
          <div
            className="flex-center gap-1 px-1 overflow-hidden"
            onClick={() => handleClick(ContentType.DOCUMENT)}
          >
            <div className="flex-center">
              <File className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Document</div>
          </div>
          <div
            className="flex-center gap-1 px-1 overflow-hidden"
            onClick={() => handleClick(ContentType.LINKEDIN)}
          >
            <div className="flex-center">
              <Linkedin className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Linkedin</div>
          </div>
          <div
            className="flex-center gap-1 px-1 overflow-hidden"
            onClick={() => handleClick(ContentType.YOUTUBE)}
          >
            <div className="flex-center">
              <Youtube className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Youtube</div>
          </div>
          <div
            className="flex-center gap-1 px-1 overflow-hidden"
            onClick={() => handleClick(ContentType.TWEET)}
          >
            <div className="flex-center">
              <Bird className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Tweet</div>
          </div>
          <div
            className="flex-center gap-1 px-1 overflow-hidden"
            onClick={() => handleClick(ContentType.ALL)}
          >
            <div className="flex-center">
              <LibraryBig className="size-3" />
            </div>
            <div className="text-xs md:text-sm font-semibold">Display All</div>
          </div>
        </div>
      </div>
    </>
  );
}
