import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import { FiGlobe } from "react-icons/fi";
import { MdEmail, MdLock, MdPhone } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";

export default function Settings() {
  const styles = {
    "input-field":
      "w-80 py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <h1 className="font-bold text-2xl text-black mb-4">Settings</h1>

        <div className="p-4">
          <div>
            <Image
              src={"/sample-user-2.jpg"}
              width={400}
              height={400}
              alt="Profile Image"
              className="object-cover w-32 h-32 rounded-full inline"
            />

            <button className="bg-black text-white px-10 py-2 rounded-full font-medium inline ml-5">
              Upload Image
            </button>
          </div>
          <form action="" className="w-[700px] mt-8">
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Full Name"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="surName"
                  id="surName"
                  placeholder="Enter Sur Name"
                  className={styles["input-field"]}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdEmail className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={styles["input-field"]}
                />
              </div>
              <div className="relative mb-4 ">
                <MdPhone className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className={styles["input-field"]}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdLock className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={styles["input-field"]}
                />
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
            </div>
            <button className="rounded-full py-2 px-10 bg-[#D32A3D] text-white font-medium float-right">
              Save & Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
