"use client";
import { Eye } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { motion } from "motion/react";
import { useAuthStore, useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";

type SetterFunction = ((value: string) => void) | ((value: string) => void);

export default function Login() {
  const {
    email,
    updateEmail,
    password,
    updatePassword,
    error,
    updateError,
    passwordVisible,
    updatePasswordVisible,
  } = useUserStore();

  const { login, authError, setAuthError, isAuthenticated, getUser } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    func: SetterFunction
  ) {
    updateError(false);
    setAuthError("");
    func(e.target.value);
  }

  async function handleClick() {
    if (!email || !password) {
      updateError(true);
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    const result = await login(data);

    if (result?.success) {
      getUser();
      router.push("/dashboard");
    }
  }
  return (
    <>
      <div className="brainy-gradient h-[calc(100vh-64px)] w-full relative z-0">
        {/* Change Height here  */}
        <div className="flex-justify-center h-full sm:flex sm:justify-between text-white w-full p-3">
          {/* Left slider for pc  */}
          <motion.div
            initial={{ x: -2000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:block h-full w-3/4"
          >
            <div className="bg-main-color h-full [clip-path:polygon(0_0,25%_0,100%_50%,25%_100%,0_100%)]"></div>
          </motion.div>
          <div className="mx-10">
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              className="shadow-2xl shadow-gray-800 border-2 border-main-color h-auto w-60 sm:w-80 rounded-xl "
            >
              <div className="flex flex-col gap-3 py-10 px-6">
                <div className="text-2xl text-center font-extrabold">Login</div>
                <hr />
                <div className="flex flex-col font-semibold">
                  Email:
                  <input
                    type="text"
                    placeholder="email"
                    className="mt-3 rounded-sm outine-none bg-transparent border-2 border-main-color focus:outline-gray-400 "
                    onChange={(e) => handleChange(e, updateEmail)}
                  />
                </div>
                <div className="flex flex-col font-semibold relative">
                  Password:
                  <div className="relative mt-3">
                    <input
                      type={passwordVisible ? "text" : "password"} // Changed from "text" to "password"
                      placeholder="password"
                      className="w-full rounded-sm outline-none bg-transparent border-2 border-main-color focus:outline-gray-400 pr-8"
                      onChange={(e) => handleChange(e, updatePassword)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Eye
                        size={16}
                        onClick={() => updatePasswordVisible(!passwordVisible)}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex-justify-center border-2 border-white mt-2 p-1 rounded-full cursor-pointer">
                  <button className="text-sm font-bold" onClick={handleClick}>
                    Login
                  </button>
                </div>
                {error ? (
                  <>
                    <div className="flex-justify-center font-extrabold text-red-600 text-xs">
                      Error! Please enter all fields
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {authError ? (
                  <>
                    <div className="flex-justify-center font-extrabold text-red-600 text-xs">
                      {authError}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
