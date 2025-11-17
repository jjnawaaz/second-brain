import { motion } from "motion/react";
export default function HeroSection() {
  return (
    <>
      <div className=" h-auto container mx-auto flex flex-col sm:flex-row sm:justify-between mt-5 ">
        <div className="h-full w-full p-6">
          <div className="flex flex-col gap-y-10 sm:mt-20 h-auto">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className=" justify-center h-auto p-2 rounded-xl shadow-md shadow-gray-600"
            >
              <h1 className="text-center text-md sm:text-lg md:text-lg lg:text-2xl font-semibold">
                Save Anything,{" "}
                <span className="text-gray-400 font-bold">
                  Remember Everything...
                </span>
              </h1>
              <ul className="text-xs sm:text-sm lg:text-md text-left p-2 text-gray-300">
                <li className="text-gray-300">
                  <span className="font-bold text-white">YouTube -</span>{" "}
                  videos, tutorials, lectures, podcasts
                </li>
                <li className="text-gray-300">
                  {" "}
                  <span className="font-bold text-white">LinkedIn -</span>{" "}
                  articles, posts, career resources
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">X (Twitter) -</span>{" "}
                  threads, insights, announcements
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Blogs & Online Articles -
                  </span>
                  any web document from across the internet
                </li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="justify-center h-auto p-2 rounded-xl shadow-md shadow-gray-600"
            >
              <h1 className="text-center text-md sm:text-lg md:text-lg lg:text-2xl font-semibold">
                One Place for all{" "}
                <span className="text-gray-400 font-bold">Your Knowledge</span>
              </h1>
              <ul className="text-xs sm:text-sm lg:text-md text-center p-2 text-white">
                <li className="">Videos you want to revisit</li>
                <li className="">Threads you don’t want to lose</li>
                <li className="">Long-form blog posts worth saving</li>
                <li className="">Research, documents, and articles</li>
                <li className="">Notes, ideas, and thoughts</li>
                <li className="">Bookmarks you never actually check</li>
              </ul>
            </motion.div>
          </div>
        </div>
        <div className=" h-full w-full p-6">
          <div className="flex flex-col gap-y-10">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="justify-center h-auto p-2 rounded-xl shadow-md shadow-gray-600"
            >
              <h1 className="text-center text-md sm:text-lg md:text-lg lg:text-2xl font-semibold">
                Smart{" "}
                <span className="text-gray-400 font-bold">Categorization</span>
              </h1>
              <h1 className="text-center text-sm sm:text-sm md:text-sm lg:text-lg font-medium">
                Automatically sort your saved content into:
              </h1>
              <ul className="text-xs sm:text-sm lg:text-md text-center p-2 text-gray-300">
                <li className="text-gray-300">
                  <span className="font-medium text-white">YOUTUBE</span>
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">LINKEDIN</span>
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">X (TWITTER)</span>
                </li>
                <li className="text-gray-300">
                  <span className="font-medium text-white">
                    BLOGS AND ONLINE ARTICLES{"(DOCUMENTS)"}
                  </span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="justify-center h-auto p-2 rounded-xl shadow-md shadow-gray-600"
            >
              <h1 className="text-center text-md sm:text-lg md:text-lg lg:text-2xl font-semibold">
                Why This{" "}
                <span className="text-gray-400 font-bold">Matters</span>
              </h1>
              <h1 className="text-center text-sm sm:text-sm md:text-sm lg:text-lg font-medium">
                Most people lose important information because it lives on:
              </h1>
              <ul className="text-xs sm:text-sm lg:text-md text-center p-2 text-gray-300">
                <li className="text-gray-300">
                  <span className="font-semibold text-white">
                    A random YouTube playlist
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="font-semibold text-white">
                    A saved X thread
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="font-semibold text-white">
                    A buried LinkedIn post
                  </span>
                </li>
                <li className="text-gray-300">
                  <span className="font-semibold text-white">
                    A bookmark that’s never opened again
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
