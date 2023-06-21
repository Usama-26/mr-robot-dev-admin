/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import { FiDownload } from "react-icons/fi";
import socket from "../../../socket";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import chatsRepository from "@/repositories/chatsRepository";
import { Conversation } from "@/components/Chat/Conversation";
import { ChatBox } from "@/components/Chat/ChatBox";
import { toast } from "react-toastify";

export default function Chat() {
  const user = useSelector(({ auth }) => auth.user);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  const [isEditChatModalOpen, setIsEditChatModalOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [actionOnChat, setActionOnChat] = useState({});
  const [selected, setSelected] = useState("open");
  const [isClosed, setIsClosed] = useState(false);

  function handleSlected(e) {
    setSelected(e.target.name);
    setCurrentChat(null);
  }
  function openEditChatModal(chat, chatIndex) {
    setIsEditChatModalOpen(true);
    setIsClosed(chat.isClosed);
    setActionOnChat({ chat, chatIndex });
  }
  function closeEditChatModal() {
    setIsEditChatModalOpen(false);
  }

  function openDeleteModal(chat, chatIndex) {
    setIsDeleteOpen(true);
    console.log(chat);
    setActionOnChat({ chat, chatIndex });
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  const getChats = async () => {
    try {
      const { result } = await chatsRepository.getUserChats(user.id);
      setChats(result);
      setFilteredChats(result.filter((chat) => !chat.isClosed));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    user && getChats();
  }, [user?.id]);

  useEffect(() => {
    socket.emit("new-staff-add", user?.id);
    socket.on("get-users", (activeUsers) => {
      setOnlineUsers(activeUsers);
    });
  }, [user]);
  function checkOnlineStatus(chat) {
    const chatmember = chat?.senderId?.id;
    const online = onlineUsers.find((user) => user.userId == chatmember);
    return online ? true : false;
  }
  async function deleteChat() {
    try {
      const chatDeleted = await chatsRepository.deleteChat(
        actionOnChat.chat.id
      );
      filteredChats.splice(actionOnChat.chatIndex, 1);
      chats.splice(actionOnChat.chatIndex, 1);

      toast.success("Conversation Deleted Successfully!", {});
      closeDeleteModal();
    } catch (error) {
      toast.error(error, {});
      closeDeleteModal();
    }
  }
  async function updateChat(chat) {
    try {
      const payload = {
        isClosed: isClosed,
      };
      const { result } = await chatsRepository.updateChat(
        actionOnChat?.chat.id,
        payload
      );

      getChats();
      console.log(chats);
      toast.success("Conversation has been closed!", {});
      closeEditChatModal();
    } catch (error) {
      toast.error(error, {});
    }
  }
  useEffect(() => {
    console.log(chats);
    selected == "open"
      ? setFilteredChats((prev) => chats?.filter((chat) => !chat.isClosed))
      : setFilteredChats((prev) => chats?.filter((chat) => chat.isClosed));
  }, [selected, chats]);
  useEffect(() => {
    socket.emit("get-online-users");
    socket.on("online-users", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });
    socket.on("new-conversation", () => {
      getChats();
    });
  }, []);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4">
        <Tab.Group>
          <Tab.List className={"flex flex-wrap"}>
            <button
              onClick={handleSlected}
              name="open"
              className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                selected == "open" ? "bg-[#D32A3D]" : "bg-slate-300"
              }`}
            >
              Opened Chats
            </button>
            <button
              onClick={handleSlected}
              name="close"
              className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                selected == "close" ? "bg-[#D32A3D]" : "bg-slate-300"
              }`}
            >
              Closed Chats
            </button>
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <div className="flex gap-4">
                <div className="basis-1/4">
                  {/* User Info */}
                  <div className="card p-4 min-w-[400px] flex gap-4 mb-4 rounded-lg border border-zinc-300">
                    <img
                      src={user?.photoUrl}
                      width={200}
                      height={200}
                      className="w-16 h-16 rounded-full object-cover"
                      alt="user avatar"
                    />
                    <div>
                      <h3 className="text-[#d32a3d] font-semibold text-lg">
                        {user?.firstName}
                      </h3>
                      <h5 className="font-semibold text-gray-500">
                        {user?.group?.groupName}
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
                    {filteredChats?.map((chat, index) => (
                      <div key={index} onClick={() => setCurrentChat(chat)}>
                        <Conversation
                          chat={chat}
                          openEditChatModal={openEditChatModal}
                          openDeleteModal={openDeleteModal}
                          online={checkOnlineStatus(chat)}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 justify-between flex flex-col rounded-lg chat-box border">
                  {/* Recipient Status */}

                  {/* Message Board */}
                  <ChatBox
                    socket={socket}
                    chat={currentChat}
                    currentUser={user?.id}
                    online={checkOnlineStatus(currentChat)}
                  />
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
          <input
            id="close"
            name="close"
            type="checkbox"
            checked={isClosed}
            onClick={(e) => setIsClosed((prev) => !prev)}
            className="w-4 h-4 mr-4 mb-4 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm"
          />
          <label htmlFor="close" className="inline ">
            Close Chat
          </label>
          <label htmlFor="email" className="block mb-2">
            Email Transcript
          </label>
          <div className="flex items-center mb-4">
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
          <button
            onClick={updateChat}
            className="bg-[#D32A3D] text-white text-center rounded-full py-2  block mt-4 w-28 mx-auto "
          >
            Save
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
            onClick={deleteChat}
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
    </AppLayout>
  );
}
