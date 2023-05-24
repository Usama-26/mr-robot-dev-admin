import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  function handleLoginSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Head>
        <title>Login | Mr. Robot Dev</title>
      </Head>
      <AuthLayout>
        <div className="container my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full">
          <Image
            src="/mrrobotdev.svg"
            width={138}
            height={98}
            alt="Company Logo"
            className="mx-auto mb-4 md:mb-6"
          />
          <h1 className="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-md mb-10">
            Login
          </h1>
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 bg-white rounded-2xl shadow-md p-6 md:p-8 xl:p-10 mb-32 ">
            <form className="mb-4 mx-5 sm:mx-8 2xl:mx-10">
              <div className="relative mb-4">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4">
                <IoMdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={styles["input-field"]}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                  ) : (
                    <IoMdEye className={styles["input-field-icon__right"]} />
                  )}
                </button>
              </div>
              <Link
                href={"/auth/forgot_password"}
                className="float-right clear-right mb-8 text-sm hover:underline underline-offset-2"
              >
                Forgot Password?
              </Link>
              <button
                onClick={handleLoginSubmit}
                className="w-full text-white font-medium py-3 rounded-full bg-[#FF001D] hover:bg-[#D51E33]"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm">
              {`Don't have an account? `}
              <Link
                href={"/auth/signup"}
                className="hover:underline text-[#D51E33]"
              >
                Signup
              </Link>{" "}
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
