"use client";

import { useEffect, useState } from "react";
import {
  Bird,
  File,
  Linkedin,
  PlusIcon,
  SquareMenu,
  X,
  Youtube,
} from "lucide-react";
import { useAuthStore, useMenuStore } from "../store/userStore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { sidebarOpen, updateSideBarOpen, updateSideBarMobileOpen } =
    useMenuStore();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  });
  function handleClick(result: boolean) {
    updateSideBarMobileOpen(false);
    updateSideBarOpen(result);
  }
  const [openContent, setOpenContent] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption);
  return (
    <>
      <div className=" flex-1 relative bg-transparent">
        {/* side bar open icon  */}
        {!sidebarOpen && (
          <div className="fixed inset-0 left-1 top-16 z-[9998]">
            <SquareMenu
              className="size-8 stroke-white bg-transparent"
              onClick={() => handleClick(true)}
            />
          </div>
        )}
        {/* sidebar menu items  */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[9998] left-5 top-20 backdrop-blur-lg rounded-xl h-1/2 w-1/4 md:w-1/6 flex flex-col text-white">
            <div
              onClick={() => handleClick(false)}
              className="flex justify-end p-4"
            >
              <X className="size-6" />
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
        )}

        {/* Add Content Plus Button  */}
        <div className="fixed bottom-5 right-5 backdrop-blur-sm rounded-full brainy-gradient shadow-md shadow-black z-[9999] ">
          <PlusIcon
            className="size-10 text-gray-300"
            onClick={() => setOpenContent(true)}
          />
        </div>

        {/* Add content pop up menu  */}
        {openContent && (
          <div className="absolute inset-0 h-auto md:h-auto w-full backdrop-blur-sm z-[9999]">
            <div className="flex items-center justify-center h-full w-full">
              {" "}
              {/* Center container */}
              <div className="flex flex-col gap-2 rounded-xl h-auto w-auto mx-8 md:w-1/2  brainy-gradient text-white">
                <div className="flex justify-end w-full p-3">
                  <X onClick={() => setOpenContent(false)} />
                </div>
                <div className="flex justify-center w-full text-lg font-bold">
                  Create Content
                </div>
                <div className="flex flex-col gap-3  m-2">
                  <div className=" flex-center justify-between p-3">
                    <div>Title</div>
                    <div>
                      <input
                        type="text"
                        placeholder="Title"
                        className="p-0.5 bg-transparent  rounded-md focus:outline-main-color  border-b-2 border-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between m-2  h-32">
                    <div>Description</div>
                    <div>
                      <textarea
                        placeholder="Description"
                        className="bg-transparent border-b-2 p-2  border-white rounded-md focus:outline-main-color"
                      />
                    </div>
                  </div>
                  <div className=" flex-center justify-between p-3">
                    <div>Link</div>
                    <div>
                      <input
                        type="text"
                        placeholder="Link"
                        className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                      />
                    </div>
                  </div>
                  <div className="flex-center justify-between p-3 ">
                    <div>Type:</div>
                    <div>
                      <div className=" w-auto grid grid-cols-2 place-content-center text-sm lg:flex-center md:gap-2 overflow-hidden">
                        <div className="flex-center gap-2">
                          <div>Youtube</div>
                          <div>
                            <input
                              type="radio"
                              name="options"
                              value="YOUTUBE"
                              checked={selectedOption === "YOUTUBE"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              placeholder="Type"
                              className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                            />
                          </div>
                        </div>
                        <div className="flex-center gap-2">
                          <div>Tweet</div>
                          <div>
                            <input
                              type="radio"
                              name="options"
                              checked={selectedOption === "TWEET"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              value="TWEET"
                              placeholder="Type"
                              className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                            />
                          </div>
                        </div>
                        <div className="flex-center gap-2">
                          <div>LinkedIn</div>
                          <div>
                            <input
                              type="radio"
                              name="options"
                              checked={selectedOption === "LINKEDIN"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              value="LINKEDIN"
                              placeholder="Type"
                              className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                            />
                          </div>
                        </div>
                        <div className="flex-center gap-2">
                          <div>Document</div>
                          <div>
                            <input
                              type="radio"
                              name="options"
                              checked={selectedOption === "DOCUMENT"}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              value="DOCUMENT"
                              placeholder="Type"
                              className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex-center justify-between p-3">
                    Tags:
                    <input
                      type="text"
                      placeholder="Title"
                      className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                    />
                  </div>
                  <button className="border-2 border-gray-400 rounded-lg w-1/2 mx-auto p-1 my-3">
                    Create Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards render here  */}
        <div className="min-h-full brainy-gradient p-10 text-white grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="bg-transparent rounded-lg shadow-sm p-3 border-2 border-gray-200 flex flex-col gap-y-6"
            >
              <h3 className="text-xl text-center font-extrabold mb-2">
                Best Song
              </h3>
              <p className="text-justify text-sm">
                Learn how to build modern web applications with React and
                Next.js in this comprehensive tutorial covering hooks, state
                management, and server-side rendering.
              </p>
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full z-0 rounded-md"
                  src="https://www.youtube.com/embed/iAIBF2ngbWY?si=T-aADnyMw6Fl6DvP"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

                {/* <blockquote
                  className="twitter-tweet"
                  data-media-max-width="560"
                >
                  <p lang="en" dir="ltr">
                    This{" "}
                    <a href="https://twitter.com/kirat_tw?ref_src=twsrc%5Etfw">
                      @kirat_tw
                    </a>{" "}
                    video broke me. I literally couldn&#39;t stop my tears. we
                    only see the success of him, but that video showed the
                    unimaginable hard work behind it. Hard Times teaches you and
                    make you strong.
                    <br />
                    ​Thank you, Harkirat Bhaiya, for the real inspiration.{" "}
                    <a href="https://t.co/bWrQZmlSZr">
                      pic.twitter.com/bWrQZmlSZr
                    </a>
                  </p>
                  &mdash; Harsh Dahiya (@believeharsh){" "}
                  <a href="https://twitter.com/believeharsh/status/1986368199764680960?ref_src=twsrc%5Etfw">
                    November 6, 2025
                  </a>
                </blockquote>{" "}
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charSet="utf-8"
                ></script> */}
              </div>
              <div className="flex-center gap-3 h-16 overflow-hidden w-full">
                <div className="flex-center text-sm">Tags:</div>
                <div className="flex-center flex-wrap gap-2 text-xs">
                  {[1, 2, 3, 4].map((item) => (
                    <span key={item}>#Music</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
