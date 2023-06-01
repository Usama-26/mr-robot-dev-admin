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

export default function SideNav() {
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
        <li>
          <Link href="/admin/pricing" className={styles["list-item"]}>
            <IoPricetags className={styles["list-item__icon"]} />
            App Pricing
          </Link>
        </li>
        <li>
          <Link href="/admin/blog" className={styles["list-item"]}>
            <MdDashboard className={styles["list-item__icon"]} />
            Blog Management
          </Link>
        </li>
        <li>
          <Link href="/admin/newsletter" className={styles["list-item"]}>
            <FaEnvelopeOpenText className={styles["list-item__icon"]} />
            Newsletter
          </Link>
        </li>
        <li>
          <Link href="/admin/statistics" className={styles["list-item"]}>
            <IoStatsChart className={styles["list-item__icon"]} />
            Statistics
          </Link>
        </li>
        <li>
          <Link href="/admin/notifications" className={styles["list-item"]}>
            <MdNotifications className={styles["list-item__icon"]} />
            Notifications
          </Link>
        </li>
        <li>
          <Link href="/admin/permissions" className={styles["list-item"]}>
            <TbShieldCheckered className={styles["list-item__icon"]} />
            Permissions
          </Link>
        </li>
        <li>
          <Link href="/admin/user_management" className={styles["list-item"]}>
            <FaUsers className={styles["list-item__icon"]} />
            User Management
          </Link>
        </li>
        <li>
          <Link href="/admin/approvals" className={styles["list-item"]}>
            <IoMdPersonAdd className={styles["list-item__icon"]} />
            Signup Approvals
          </Link>
        </li>
        <li>
          <Link href="/admin/settings" className={styles["list-item"]}>
            <MdOutlineSettings className={styles["list-item__icon"]} />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
