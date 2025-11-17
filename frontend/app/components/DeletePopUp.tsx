import { useContentStore } from "../store/userStore";
import { X } from "lucide-react";

interface DeleteContentBoxProps {
  setOpenDeleteContent: (value: boolean) => void;
  selectedId: string;
  onDeleteSuccess?: () => void;
}

export default function DeletePopUp({
  setOpenDeleteContent,
  selectedId,
  onDeleteSuccess,
}: DeleteContentBoxProps) {
  const { deleteContent } = useContentStore();
  async function handleDelete(id: string) {
    const response = await deleteContent(id);
    if (response?.success) {
      alert("Link deleted");
      setOpenDeleteContent(false);
      onDeleteSuccess?.();
    } else {
      alert(response?.message);
    }
  }

  return (
    <>
      <div className="fixed inset-0 top-10 h-screen w-full backdrop-blur-sm z-[100]">
        <div className="flex items-center justify-center h-full w-full">
          {" "}
          {/* Center container */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="flex flex-col gap-2 rounded-xl font-semibold  h-auto max-h-[85vh] w-full max-w-2xl mx-auto brainy-gradient text-white overflow-y-auto">
              <div className="flex-center justify-end p-4">
                <X onClick={() => setOpenDeleteContent(false)} />
              </div>
              <div className="brainly-gradient h-52 w-72 flex flex-col items-center justify-start">
                <div className="text-center ">
                  Are you sure you want to delete this link ?
                </div>
                <div className="flex-center justify-center gap-x-10 py-2 mt-2 w-auto mx-auto">
                  <button
                    className=" px-5 mx-2 border-2 border-white rounded-md"
                    onClick={() => handleDelete(selectedId)}
                  >
                    Yes
                  </button>
                  <button
                    className=" px-5 mx-2 border-2 border-white rounded-md"
                    onClick={() => setOpenDeleteContent(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
