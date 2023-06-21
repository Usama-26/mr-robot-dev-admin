import { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { MdEmail, MdPhoneEnabled } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userSignUpRequest } from "@/redux/auth/auth.actions";
import { toast } from "react-toastify";
import { baseUrl } from "@/repositories/genericRepository";
import axios from "axios";
export default function Signup() {
  const router = useRouter();
  const group = router.query.group;
  const token = router.query.token;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState();
  const [showPage, setShowPage] = useState(false);
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "staff",
    group: "",
    signedUpBy: "Admin",
  });

  const verifyToken = async () => {
    console.log("Token", token);
    try {
      const response = await axios.get(
        `${baseUrl}/auth/verify-email?token=${token}`
      );
      setShowPage(true);
    } catch (e) {
      toast.error(e?.response?.data?.message, {});
      console.log("Error Post", e);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
      // getLocation();
    }
  }, [token]);

  useEffect(() => {
    getLocation();
  }, []);

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
    const defaultD = {
      firstName: "",
      surName: "",
      email: "",
      password: "",
      phoneNo: "",
      role: "staff",
      group: "",
      signedUpBy: "Admin",
    };
    setData(defaultD);
  };
  function handleSignupSubmit(event) {
    event.preventDefault();
    if (data.email !== confirmEmail) {
      toast.error("Email not matched", {});
    } else if (data.password !== confirmPassword) {
      toast.error("Password not matched", {});
    } else {
      const payload = {
        ...data,
        group: group,
      };
      console.log("Payload", payload);
      dispatch(userSignUpRequest(payload, handleLoading));
    }
  }

  const getLocation = async () => {
    try {
      const response = await axios.get(
        `https://geolocation-db.com/json/548bd320-00be-11ee-82dd-87424d907439`
      );
      console.log("Response", response.data);
      setLocation(response);
    } catch (e) {
      console.log("Error Post", e);
    }
  };
  return (
    <>
      <Head>
        <title>Signup | Mr. Robot Dev</title>
      </Head>

      <AuthLayout>
        {showPage && (
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
              <form
                className="mb-4 mx-5 sm:mx-8 2xl:mx-10"
                onSubmit={handleSignupSubmit}
              >
                <div className="relative mb-4">
                  <RiUserFill className={styles["input-field-icon__left"]} />
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter Full Name"
                    className={styles["input-field"]}
                    value={data.firstName}
                    onChange={(e) => handleData("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <RiUserFill className={styles["input-field-icon__left"]} />
                  <input
                    type="text"
                    name="surName"
                    id="surName"
                    placeholder="Enter Sur Name"
                    className={styles["input-field"]}
                    value={data.surName}
                    onChange={(e) => handleData("surName", e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <MdPhoneEnabled
                    className={styles["input-field-icon__left"]}
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    id="phoneNo"
                    placeholder="Enter Your Phone"
                    className={styles["input-field"]}
                    value={data.phoneNo}
                    onChange={(e) => handleData("phoneNo", e.target.value)}
                    required
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
                    value={data.email}
                    onChange={(e) => handleData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <MdEmail className={styles["input-field-icon__left"]} />
                  <input
                    type="email"
                    name="confirmEmail"
                    id="confirmEmail"
                    placeholder="Confirm Email Address"
                    className={styles["input-field"]}
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
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
                    value={data.password}
                    onChange={(e) => handleData("password", e.target.value)}
                    required
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
                    type={isPasswordVisibleConfirm ? "text" : "password"}
                    name="confirm-new-password"
                    id="confirmNewPassword"
                    placeholder="Confirm Password"
                    className={styles["input-field"]}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm)
                    }
                  >
                    {isPasswordVisibleConfirm ? (
                      <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                    ) : (
                      <IoMdEye className={styles["input-field-icon__right"]} />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-semibold py-3 rounded-full bg-[#D32A3D] hover:bg-[#D51E33]"
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
        )}
      </AuthLayout>
    </>
  );
}
