import Image from "next/image";
import Link from "next/link";
import {
  MdDashboard,
  MdOutlineSettings,
  MdNotifications,
} from "react-icons/md";
import { TbShieldCheckered } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { FaEnvelopeOpenText, FaUsers } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { GiCheckedShield } from "react-icons/gi";
import { withAuth } from "../Helpers/withAuth";

const SideNav = (props) => {
  const userData = props.userData;
  console.log("User Data from SideNav", userData);
  const styles = {
    "list-item":
      "menu-list-item block px-10 py-4 hover:bg-[#A1202E] font-medium",
    "list-item__icon": "w-5 h-5 inline stroke-white mr-2",
  };
  return (
    <div className="sidenav fixed top-0 left-0 h-screen md:block hidden sidenav-width  bg-[#D32A3D] overflow-auto">
      <Image
        src="/mrrobotdev.svg"
        width={138}
        height={98}
        alt="Company Logo"
        className="mx-auto mb-4 md:mb-6 mt-14"
      />

      <ul className="my-10 text-white">
        <li>
          <Link href="/admin" className={styles["list-item"]}>
            <MdDashboard className={styles["list-item__icon"]} />
            Dashboard
          </Link>
        </li>
        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "App Pricing Screen"
          )?.view) && (
          <li>
            <Link href="/admin/pricing" className={styles["list-item"]}>
              <IoPricetags className={styles["list-item__icon"]} />
              App Pricing
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Blog Management Screen"
          )?.view) && (
          <li>
            <Link href="/admin/blog_management" className={styles["list-item"]}>
              <MdDashboard className={styles["list-item__icon"]} />
              Blog Management
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Newsletter Screen"
          )?.view) && (
          <li>
            <Link href="/admin/newsletter" className={styles["list-item"]}>
              <FaEnvelopeOpenText className={styles["list-item__icon"]} />
              Newsletter
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Statistics Screen"
          )?.view) && (
          <li>
            <Link href="/admin/statistics" className={styles["list-item"]}>
              <IoStatsChart className={styles["list-item__icon"]} />
              Statistics
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Notifications Screen"
          )?.view) && (
          <li>
            <Link href="/admin/notifications" className={styles["list-item"]}>
              <MdNotifications className={styles["list-item__icon"]} />
              Notifications
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Permissions Screen"
          )?.view) && (
          <li>
            <Link href="/admin/permissions" className={styles["list-item"]}>
              <TbShieldCheckered className={styles["list-item__icon"]} />
              Permissions
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "User Management"
          )?.view) && (
          <li>
            <Link href="/admin/user_management" className={styles["list-item"]}>
              <FaUsers className={styles["list-item__icon"]} />
              User Management
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Signup Approvals"
          )?.view) && (
          <li>
            <Link href="/admin/approvals" className={styles["list-item"]}>
              <IoMdPersonAdd className={styles["list-item__icon"]} />
              Signup Approvals
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Security"
          )?.view) && (
          <li>
            <Link href="/admin/security" className={styles["list-item"]}>
              <GiCheckedShield className={styles["list-item__icon"]} />
              Security
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Live Chat Screen"
          )?.view) && (
          <li>
            <Link href="/admin/chat" className={styles["list-item"]}>
              <HiChatBubbleOvalLeft className={styles["list-item__icon"]} />
              Live Chat
            </Link>
          </li>
        )}

        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Settings"
          )?.view) && (
          <li>
            <Link href="/admin/settings" className={styles["list-item"]}>
              <MdOutlineSettings className={styles["list-item__icon"]} />
              Settings
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default withAuth(SideNav);
