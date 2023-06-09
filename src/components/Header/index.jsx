/* eslint-disable @next/next/no-img-element */
import { RiSearchLine } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { logOutRequest } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Fragment } from "react";
import { RiUserFill, RiLogoutBoxRFill } from "react-icons/ri";
import { MdOutgoingMail, MdSettings } from "react-icons/md";
import Link from "next/link";
import { withAuth } from "../Helpers/withAuth";
const Header = (props) => {
  const userData = props.userData;
  const styles = {
    "menu-item": "hover:bg-gray-200 w-full p-2 rounded-md",
    "menu-item__icon": "w-5 h-5 inline mr-2 fill-[#FF001D]",
  };
  const dispatch = useDispatch();
  const handleCallBack = () => {};
  const handleLogout = () => {
    dispatch(logOutRequest(handleCallBack));
  };
  return (
    <div className="w-full sticky top-0 px-8 py-4 shadow-md flex justify-between items-center bg-white z-30">
      <div className="relative">
        <input
          type="text"
          className="lg:w-80 sm:w-72 w-60 py-2 px-4 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm"
          placeholder="Search"
        />
        <RiSearchLine className="w-4 h-4 absolute top-3 right-4 fill-black/60" />
      </div>
      <div className="relative">
        <Menu>
          <Menu.Button className={"focus:outline-none"}>
            <img
              src={userData?.photoUrl}
              width={200}
              height={200}
              className="w-10 h-10 rounded-full object-cover"
              alt="user avatar"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 py-4  px-2 rounded-md bg-white z-50 shadow-custom w-40 text-sm">
              <ul className="list-none">
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/settings">
                    <RiUserFill className={styles["menu-item__icon"]} />
                    Account
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/chat">
                    <MdOutgoingMail className={styles["menu-item__icon"]} />
                    Inbox
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/settings">
                    <MdSettings className={styles["menu-item__icon"]} />
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <li className="cursor-pointer" onClick={() => handleLogout()}>
                    <RiLogoutBoxRFill className={styles["menu-item__icon"]} />
                    Logout
                  </li>
                </Menu.Item>
              </ul>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default withAuth(Header);
