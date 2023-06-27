/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import { FiGlobe } from "react-icons/fi";
import { MdEmail, MdLock, MdPhone } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { withAuth } from "@/components/Helpers/withAuth";
import {
  IoMdEye,
  IoMdEyeOff,
  IoMdLock,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { updateUser } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "@/redux/auth/auth.actions";

const Settings = (props) => {
  const userData = props.userData;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userbyID);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: user?.firstName,
    surName: user?.surName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    photoUrl: user?.photoUrl,
  });
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const styles = {
    "input-field":
      "w-[400px] py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };
  function handleUpload(d) {
    const file = d;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mrrobotdev"); // replace with your upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/arslanvirk/image/upload", formData)
      .then((response) => {
        // updateUrl(response.data.secure_url);
        console.log(response.data.secure_url);
        handleData("photoUrl", response.data.secure_url);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Image upload error, try again!!!", {});
      });
  }

  const handleLoading = () => {
    setLoading(false);
    dispatch(getUser(userData.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      firstName: data.firstName,
      surName: data.surName,
      phoneNo: data.phoneNo,
      photoUrl: data.photoUrl,
    };
    const id = userData.id;
    dispatch(updateUser(payload, id, handleLoading));
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <h1 className="font-bold text-2xl text-black mb-4">Settings</h1>

        <div className="p-4">
          <div>
            <img
              src={data.photoUrl}
              width={400}
              height={400}
              alt="Profile Image"
              className="object-cover w-32 h-32 rounded-full inline"
            />

            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Settings"
              )?.update) && (
              <button
                className="bg-black text-white px-10 py-2 rounded-full font-medium inline ml-5"
                onClick={handleButtonClick}
              >
                Upload Image
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <form action="" className="w-[700px] mt-8">
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  value={data.firstName}
                  id="fullName"
                  placeholder="Enter Full Name"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("firstName", e.target.value)}
                />
              </div>
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="surName"
                  id="surName"
                  value={data.surName}
                  placeholder="Enter Sur Name"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("surName", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdEmail className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  id="email"
                  placeholder="Email"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("email", e.target.value)}
                />
                <span className="flex absolute top-3 right-4 items-center">
                  <span className="text-[11px] text-green-600">Verified</span>
                  <IoIosCheckmarkCircle className="w-5 h-5" color="green" />
                </span>
              </div>
              <div className="relative mb-4 ">
                <MdPhone className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="phone"
                  value={data.phoneNo}
                  id="phone"
                  placeholder="Phone"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("phoneNo", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  placeholder="Password"
                  className={styles["input-field"]}
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="relative mb-4 ">
                <MdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisibleConfirm ? "text" : "password"}
                  name="password"
                  id="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className={styles["input-field"]}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            </div>
            <div className="relative mb-4 ">
              <FiGlobe className={styles["input-field-icon__left"]} />
              <select
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                className={styles["input-field"]}
              >
                <option value="pakistan">Pakistan</option>
                <option value="south-africa">South Africa</option>
                <option value="north-america">North America</option>
                <option value="united-arab-emirates">
                  United Arab Emirates
                </option>
              </select>
            </div>
          </form>
          <div className="w-[830px]">
            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Settings"
              )?.update) && (
              <button
                className="rounded-full py-2 px-10 bg-[#D32A3D] text-white font-medium float-right"
                onClick={(e) => handleSubmit(e)}
              >
                Save & Update
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default withAuth(Settings);
