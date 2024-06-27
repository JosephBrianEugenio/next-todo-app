"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import RegisterDialog from "./components/dialogs/register";
import useAuthenticationStore from "@/app/store/authentication/auth"

export default function Login() {

  const router = useRouter();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegisterDialog = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterDialog = () => {
    setIsRegisterOpen(false);
  };

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  })

  const {userLoginAPI, isAuthenticated} = useAuthenticationStore();

  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await userLoginAPI(loginFormState);
    setIsLoading(false);
    if (result.success) {
      console.log("result", result)
      router.push("/home");
    }
  };

  useEffect(() => {
    // Check if user is authenticated on component mount
    if (isAuthenticated()) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="relative hidden sm:block">
          <Image
            src="/login-image.jpg"
            alt="login-image"
            className="object-cover dark:invert"
            layout="fill"
            priority
          />
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto bg-white p-4 rounded-lg" onSubmit={onHandleSubmit}>
            <h6 className="text-4xl font-bold text-center py-6">Login</h6>
            <div>
              <label
                htmlFor="email"
                className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@email.com"
                value={loginFormState.email}
                onChange={(e) => setLoginFormState({...loginFormState, email: e.target.value})}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-start mb-0 mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="*****"
                value={loginFormState.password}
                onChange={(e) => setLoginFormState({...loginFormState, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="border w-full my-5 py-2 bg-indigo-500 hover:bg-indigo-500 text-white button rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <div className="text-center">
              <p className="cursor-pointer text-indigo-500" onClick={openRegisterDialog}>
                Create an Account
              </p>
            </div>
          </form>
        </div>
      </div>
      <RegisterDialog isOpen={isRegisterOpen} onClose={closeRegisterDialog} />
    </>
  );
}

