import Image from "next/image";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import ModalOverlay from "../ModalOverlay";

export default function BlogCard() {
  const [isEditBlogModal, setIsEditBlogModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [data, setData] = useState({});

  function openEditBlogModal() {
    setIsEditBlogModal(true);
  }
  function closeEditBlogModal() {
    setIsEditBlogModal(false);
  }
  function openDeleteModal() {
    setIsDeleteModal(true);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }
  return (
    <>
      <div className="relative">
        <div className="shadow-[0px_0px_10px_10px_#00000011] rounded-lg p-6">
          <Image
            src={"/desktop/blog_1.png"}
            width={500}
            height={500}
            className="h-40 w-40 mx-auto"
            alt="Blog Image"
          />
          <h1 className="text-center text-xl font-bold my-4">
            Read all about our interview with Private Internet Access
          </h1>
          <p className="text-center">
            {` Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s`}
          </p>
        </div>
        <div className=" mx-auto w-56 flex justify-between mt-4">
          <button
            onClick={openEditBlogModal}
            className="text-white inline-block bg-[#00AD45] font-medium px-6 py-2 rounded-full"
          >
            Edit
          </button>
          <button
            onClick={openDeleteModal}
            className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        isOpen={isEditBlogModal}
        openModal={openEditBlogModal}
        closeModal={closeEditBlogModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Edit Blog
        </Dialog.Title>
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Blog Heading
        </label>
        <input
          type="text"
          id="blog_heading"
          defaultValue={
            "Read all about our interview with Private Internet Access"
          }
          placeholder="Enter blog heading here"
          className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
        />
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Blog Content
        </label>
        <textarea
          placeholder="Enter text here"
          defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s"
          className="border border-gray-500 rounded-lg p-4 mb-4 w-full h-48 resize-none"
        ></textarea>
        <div className="border border-dashed border-gray-500 rounded-xl p-8 mb-4">
          <button
            type="button"
            onClick={() => {}}
            className="bg-black text-white px-10 py-2 rounded-full font-semibold block mx-auto"
          >
            Choose icon to Upload
          </button>
        </div>
        <button
          type="button"
          onClick={() => {}}
          className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
        >
          Edit & Save
        </button>
      </Modal>
      <Modal
        isOpen={isDeleteModal}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Are you sure want to delete this blog?
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
      <ModalOverlay isOpen={isEditBlogModal || isDeleteModal} />
    </>
  );
}
