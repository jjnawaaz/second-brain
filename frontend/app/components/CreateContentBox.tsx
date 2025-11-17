import { ChangeEvent, useEffect } from "react";
import { ContentType, useContentStore } from "../store/userStore";
import { Trash, X } from "lucide-react";

interface CreateContentBoxProps {
  setOpenContent: (value: boolean) => void;
  onCreateSuccess?: () => void;
}

export default function CreateContentBox({
  setOpenContent,
  onCreateSuccess,
}: CreateContentBoxProps) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    link,
    setLink,
    tags,
    setTags,
    type,
    setType,
    setTag,
    tag,
    setDeleteTag,
    addContent,
    error,
    setError,
    resetStore,
  } = useContentStore();

  // clean up data
  useEffect(() => {
    resetStore();
  }, []);

  function handleChange<T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    func: (data: T) => void
  ) {
    setError("");
    func(e.target.value as T);
  }

  function handleTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setError("");
    setType(e.target.value as ContentType);
  }

  function handleTagClick() {
    setError("");
    setTags(tag);
    setTag("");
  }

  function handleTagDelete(id: number) {
    setDeleteTag(id);
  }

  async function handleContentClick() {
    if (!title || !description || !link || !type || !tags) {
      setError("Error enter all fields");
      return;
    }
    const data = {
      title: title,
      description: description,
      link: link,
      type: type,
      tags: tags,
    };
    const response = await addContent(data);
    if (response?.success) {
      alert("Link added");
      setOpenContent(false);
      onCreateSuccess?.();
    } else {
      alert("Couldn't add links");
    }
  }
  return (
    <>
      <div className="fixed inset-0 top-16 h-screen w-full backdrop-blur-sm z-[100]">
        <div className="flex items-center justify-center h-full w-full">
          {" "}
          {/* Center container */}
          <div className="flex items-center justify-center min-h-screen overflow-hidden p-4">
            <div className="flex flex-col gap-2 rounded-xl  h-auto max-h-[70vh] w-full mx-auto brainy-gradient text-white overflow-y-auto">
              <div className="flex justify-end w-full p-3 sticky top-0 bg-gradient-to-r from-black to-main-color z-10">
                <X onClick={() => setOpenContent(false)} />
              </div>
              <div className="flex justify-center w-full text-lg font-bold pb-4">
                Create Link
              </div>
              <div className="flex flex-col gap-3 m-2 px-4 pb-6">
                <div className=" flex-center justify-between p-3">
                  <div className="font-semibold">Title:</div>
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      className="p-0.5 bg-transparent border-t-2 rounded-md focus:outline-main-color border-b-2 border-white"
                      onChange={(e) => handleChange<string>(e, setTitle)}
                    />
                  </div>
                </div>
                <div className="flex justify-between m-2  h-32">
                  <div className="font-semibold">Description:</div>
                  <div>
                    <textarea
                      placeholder="Description"
                      className="bg-transparent border-b-2 border-t-2 p-2  border-white rounded-md focus:outline-main-color"
                      onChange={(e) => handleChange<string>(e, setDescription)}
                    />
                  </div>
                </div>
                <div className=" flex-center justify-between p-3">
                  <div className="font-semibold">Link:</div>
                  <div>
                    <input
                      type="text"
                      placeholder="Link"
                      className="p-0.5 bg-transparent border-b-2 border-t-2 border-white rounded-md focus:outline-main-color"
                      onChange={(e) => handleChange<string>(e, setLink)}
                    />
                  </div>
                </div>
                <div className="flex-center justify-between p-3 ">
                  <div className="font-semibold">Type:</div>
                  <div>
                    <div className=" w-auto grid grid-cols-2 place-content-center text-sm lg:flex-center md:gap-2 overflow-hidden">
                      <div className="flex-center gap-2">
                        <div className="font-medium">Youtube</div>
                        <div>
                          <input
                            type="radio"
                            name="options"
                            value={ContentType.YOUTUBE}
                            checked={type === ContentType.YOUTUBE}
                            onChange={(e) => handleTypeChange(e)}
                            placeholder="Type"
                            className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                          />
                        </div>
                      </div>
                      <div className="flex-center gap-2">
                        <div className="font-medium">Tweet</div>
                        <div>
                          <input
                            type="radio"
                            name="options"
                            checked={type === ContentType.TWEET}
                            onChange={(e) => handleTypeChange(e)}
                            value={ContentType.TWEET}
                            placeholder="Type"
                            className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                          />
                        </div>
                      </div>
                      <div className="flex-center gap-2">
                        <div className="font-medium">LinkedIn</div>
                        <div>
                          <input
                            type="radio"
                            name="options"
                            checked={type === ContentType.LINKEDIN}
                            onChange={(e) => handleTypeChange(e)}
                            value={ContentType.LINKEDIN}
                            placeholder="Type"
                            className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                          />
                        </div>
                      </div>
                      <div className="flex-center gap-2">
                        <div className="font-medium">Document</div>
                        <div>
                          <input
                            type="radio"
                            name="options"
                            checked={type === ContentType.DOCUMENT}
                            onChange={(e) => handleTypeChange(e)}
                            value={ContentType.DOCUMENT}
                            placeholder="Type"
                            className="p-0.5 bg-transparent border-b-2 border-white rounded-md focus:outline-main-color"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex-center justify-between w-full p-3">
                  <div className="font-semibold">Tags:</div>
                  <input
                    type="text"
                    placeholder="Tag"
                    className="p-0.5 bg-transparent w-1/3 border-b-2 border-t-2 border-white rounded-md focus:outline-main-color"
                    onChange={(e) => handleChange<string>(e, setTag)}
                  />
                  <button
                    className="text-xs border-b-2 border-t-2 font-medium border-white rounded-md p-2 "
                    onClick={handleTagClick}
                  >
                    Add tag
                  </button>
                </div>
                <div className="font-medium flex-center px-2 justify-around text-center relative h-10 overflow-hidden">
                  {tags && (
                    <>
                      {tags.map((item, id) => (
                        <div key={id}>
                          <span className="text-xs">
                            #{item}
                            <span className="absolute text-xs top-0">
                              <Trash
                                size={10}
                                className="text-red-200 fill-red-500"
                                onClick={() => handleTagDelete(id)}
                              />
                            </span>
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <button
                  className="border-2 border-gray-400 rounded-lg w-1/2 mx-auto p-1 my-3 font-semibold"
                  onClick={handleContentClick}
                >
                  Create Link
                </button>
                {error && (
                  <>
                    <div className="text-sm text-red-500 flex-center justify-center font-semibold">
                      {error}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
