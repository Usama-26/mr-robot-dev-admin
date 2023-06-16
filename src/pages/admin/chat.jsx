import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import { FiDownload } from "react-icons/fi";

export default function Chat() {
  const [isEditChatModalOpen, setIsEditChatModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function openEditChatModal() {
    setIsEditChatModalOpen(true);
  }
  function closeEditChatModal() {
    setIsEditChatModalOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            <button
              className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none bg-slate-300`}
            >
              New Chat
            </button>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                >
                  Closed Chats
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <div className="flex gap-4">
                <div className="basis-1/4">
                  {/* User Info */}
                  <div className="card p-4 min-w-[400px] flex gap-4 mb-4 rounded-lg border border-zinc-300">
                    <Image
                      src={"/sample-user.jpg"}
                      width={200}
                      height={200}
                      className="w-16 h-16 rounded-full object-cover"
                      alt="user avatar"
                    />
                    <div>
                      <h3 className="text-[#d32a3d] font-semibold text-lg">
                        Katie Wilson
                      </h3>
                      <h5 className="font-semibold text-gray-500">
                        Sales Officer
                      </h5>
                    </div>
                  </div>
                  {/* Chat Search */}
                  <div className="card min-w-[400px] mb-4 ">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search chat"
                      className="w-full p-4 focus:outline-none rounded-lg border border-zinc-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="card p-4 min-w-[400px] flex justify-between items-center gap-4 rounded-lg border border-zinc-300">
                      <Image
                        src={"/sample-user.jpg"}
                        width={200}
                        height={200}
                        className="w-16 h-16 rounded-full object-cover"
                        alt="user avatar"
                      />

                      <h3 className="text-gray-800 font-semibold text-lg">
                        Kate Bishop
                      </h3>
                      <div className="text-xs">
                        <span>2023/05/14</span>
                        <br />
                        <span>12:45 PM</span>
                      </div>
                      <div>
                        <button>
                          <BiEdit
                            onClick={openEditChatModal}
                            className="w-6 h-6 inline mr-2 "
                          />
                        </button>
                        <button onClick={openDeleteModal}>
                          <RiDeleteBin6Fill className="w-6 h-6 fill-[#d32a3d] inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 justify-between flex flex-col rounded-lg chat-box border">
                  {/* Recipient Status */}
                  <div className="card p-4 flex gap-4 mb-4 border-b rounded-t-lg border-gray-200 bg-white">
                    <Image
                      src={"/sample-user-2.jpg"}
                      width={200}
                      height={200}
                      className="w-16 h-16 rounded-full object-cover"
                      alt="user avatar"
                    />
                    <div>
                      <h3 className="text-[#d32a3d] font-semibold text-lg">
                        Katie Wilson
                      </h3>
                      <h5 className="font-semibold text-gray-500">Online</h5>
                    </div>
                  </div>
                  {/* Message Board */}
                  <div
                    id="messages"
                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                  >
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                              Can be verified on any platform using docker
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#D32A3D]  text-white">
                              Your error message says permission denied, npm
                              global installs must be given root privileges.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                      <button
                        type="button"
                        className=" rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
                      >
                        <FaRegSmile className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500  focus:outline-none"
                      >
                        <AiOutlinePaperClip className="w-6 h-6" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type your message!"
                        className="w-full focus:outline-none rounded-full py-2 px-4 border border-gray-300 "
                      />

                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full ml-2 px-2 bg-[#D32A3D] ease-in-out text-white focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 ml-2 transform rotate-45"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Modal
        isOpen={isEditChatModalOpen}
        openModal={openEditChatModal}
        closeModal={closeEditChatModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Chat Status
        </Dialog.Title>
        <div className="mx-10">
          <label htmlFor="email" className="block mb-2">
            Email Transcript
          </label>
          <div className="flex items-center mb-4">
            {" "}
            <input
              id="email"
              name="email"
              type="text"
              className="py-2 px-4 mr-4 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm"
              placeholder="Enter Email Address"
            />
            <button
              type="button"
              className="p-2 rounded-full bg-[#D32A3D] ease-in-out text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6  transform rotate-45"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
          <h5 className="mb-4">Download this Chat</h5>
          <button className="bg-black text-white rounded-full py-2 px-4">
            <FiDownload className="inline w-6 h-6 mr-2" />
            Download
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteOpen}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Are you sure want to delete this chat ?
        </Dialog.Title>
        <div className=" mx-auto w-56 flex justify-between mt-4">
          <button
            onClick={() => {}}
            className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
          >
            Yes
          </button>
          <button
            onClick={() => {}}
            className="text-white inline-block bg-black font-medium px-6 py-2 rounded-full"
          >
            No
          </button>
        </div>
      </Modal>

      <ModalOverlay isOpen={isEditChatModalOpen || isDeleteOpen} />
    </>
  );
}
