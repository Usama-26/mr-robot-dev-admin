import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { MdEmail, MdPhoneEnabled } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };
  function handleSignupSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Head>
        <title>Signup | Mr. Robot Dev</title>
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
          <h1 className="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-md mb-4 md:mb-6 2xl:mb-10">
            Signup
          </h1>
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 bg-white rounded-2xl shadow-md p-6 md:p-8 xl:p-10 mb-32 ">
            <form className="mb-4 mx-5 sm:mx-8 2xl:mx-10">
              <div className="relative mb-4">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Full Name"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4">
                <MdEmail className={styles["input-field-icon__left"]} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4">
                <IoMdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="new-password"
                  id="newPassword"
                  placeholder="Enter Your Password"
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
              <div className="relative mb-4">
                <IoMdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="confirm-new-password"
                  id="confirmNewPassword"
                  placeholder="Confirm Password"
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
              <div className="relative mb-4">
                <MdPhoneEnabled className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Your Phone"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4">
                <FaIdBadge className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Your Designation"
                  className={styles["input-field"]}
                />
              </div>

              <button
                onClick={handleSignupSubmit}
                className="w-full text-white font-semibold py-3 rounded-full bg-[#FF001D] hover:bg-[#D51E33]"
              >
                Signup
              </button>
            </form>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="hover:underline text-[#D51E33]"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
