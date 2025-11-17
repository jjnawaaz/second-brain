"use client";

import { useEffect, useState } from "react";
import { Pen, PlusIcon, SquareMenu, Trash } from "lucide-react";
import {
  ContentType,
  useAuthStore,
  useContentStore,
  useMenuStore,
} from "../store/userStore";
import { useRouter } from "next/navigation";
import CreateContentBox from "../components/CreateContentBox";
import SideBar from "../components/Sidebar";
import UpdateContentBox from "../components/UpdateContentBox";
import DeletePopUp from "../components/DeletePopUp";

import { motion } from "motion/react";

interface Data {
  id: string;
  title: string;
  description: string;
  link: string;
  type: ContentType;
  tags: string[];
}

export default function Dashboard() {
  const { sidebarOpen, updateSideBarOpen, updateSideBarMobileOpen } =
    useMenuStore();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [openContent, setOpenContent] = useState(false);
  const [openUpdateContent, setOpenUpdateContent] = useState(false);
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);
  const [filterType, setFilterType] = useState(ContentType.ALL);
  // import content states

  const { resetStore, getContent } = useContentStore();
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    resetStore();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [resetStore, isAuthenticated, router]);

  // Import data from backend
  useEffect(() => {
    async function getData() {
      const response = await getContent();
      if (response?.success) {
        setData(response.contents as Data[]);
      }
    }
    getData();
  }, [getContent]);

  // Filter the data client-side based on current filterType
  const filteredData =
    filterType === ContentType.ALL
      ? data
      : data.filter((item) => item.type === filterType);

  async function refreshData() {
    const response = await getContent();
    if (response?.success) {
      setData(response.contents as Data[]);
    }
  }

  function handleClick(result: boolean) {
    updateSideBarMobileOpen(false);
    updateSideBarOpen(result);
  }

  function handleUpdateClick(item: Data) {
    setSelectedItem(item);
    setOpenUpdateContent(true);
  }
  function handleDeleteClick(item: string) {
    setSelectedId(item);
    setOpenDeleteContent(true);
  }

  useEffect(() => {
    if (openContent || openUpdateContent || openDeleteContent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openContent, openUpdateContent, openDeleteContent]);

  const parentVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <>
      <div className=" flex-1 relative min-h-[calc(100vh-64px)] overflow-auto">
        {/* side bar open icon  */}
        {!sidebarOpen && (
          <div className="fixed inset-0 left-1 top-16 z-25">
            <SquareMenu
              className="size-8 stroke-white bg-transparent"
              onClick={() => handleClick(true)}
            />
          </div>
        )}
        {/* sidebar menu items  */}
        {sidebarOpen && (
          <SideBar
            handleButtonClick={handleClick}
            setFilterType={setFilterType}
          />
        )}

        {/* Add Content Plus Button  */}
        <div className="fixed bottom-5 right-5 backdrop-blur-sm rounded-full brainy-gradient shadow-md shadow-black z-25 ">
          <PlusIcon
            className="size-10 text-gray-300"
            onClick={() => setOpenContent(true)}
          />
        </div>

        {/* Add content pop up menu  */}
        {openContent && (
          <CreateContentBox
            setOpenContent={setOpenContent}
            onCreateSuccess={refreshData}
          />
        )}

        {/* Update Content pop up menu  */}
        {openUpdateContent && (
          <UpdateContentBox
            setOpenUpdateContent={setOpenUpdateContent}
            onUpdateSuccess={refreshData}
            data={selectedItem as Data}
          />
        )}
        {openDeleteContent && (
          <DeletePopUp
            setOpenDeleteContent={setOpenDeleteContent}
            selectedId={selectedId}
            onDeleteSuccess={refreshData}
          />
        )}
        {/* Cards render here  */}
        {filteredData ? (
          <>
            {" "}
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="min-h-full brainy-gradient p-10 text-white grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 gap-y-12"
            >
              {filteredData.map((item) => (
                <motion.div
                  variants={childVariants}
                  key={item.id}
                  className="bg-transparent rounded-lg shadow-sm p-3 border-2 border-gray-200 flex flex-col gap-y-6"
                >
                  <div className="flex items-center justify-between border-2 border-white px-3 py-2 gap-2">
                    <h3 className="text-xl font-extrabold flex-1 truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <Pen
                        size={14}
                        onClick={() => handleUpdateClick(item)}
                        className="stroke-white cursor-pointer hover:text-gray-300 z-20"
                      />
                      <Trash
                        size={14}
                        onClick={() => handleDeleteClick(item.id)}
                        className="stroke-white cursor-pointer hover:text-gray-300 z-20"
                      />
                    </div>
                  </div>
                  <p className="text-justify">{item.description}</p>
                  <div className="w-full overflow-hidden break-all text-sm break-words whitespace-normal cursor-pointer">
                    <div className="font-semibold">Go to link: </div>
                    <a
                      href={item.link}
                      className="cursor-pointer text-blue-400 z-25"
                    >
                      {item.link}
                    </a>
                  </div>
                  <div className="flex-center gap-2 overflow-hidden w-full">
                    <div className="flex-center text-sm">Tags:</div>
                    <div className="flex-center flex-wrap gap-2 text-xs">
                      {item.tags.map((item) => (
                        <span key={item}>#{item}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-10 h-10 border-4 border-gray-600 border-t-black rounded-full animate-spin"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
