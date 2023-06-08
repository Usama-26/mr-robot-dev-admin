import BlogCard from "@/components/BlogCard";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function BlogManagement() {
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [isEditBlogModal, setIsEditBlogModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }
  function openEditBlogModal() {
    setIsBlogModal(true);
  }
  function closeEditBlogModal() {
    setIsBlogModal(true);
  }
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="font-bold text-2xl text-black mb-4">
            Blog Management
          </h1>
          <button
            onClick={openAddBlogModal}
            className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both`}
          >
            <FaPlus className="inline w-4 h-4 mr-2 " />
            Add New Blog
          </button>
        </div>
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <Modal
        isOpen={isAddBlogModal}
        openModal={openAddBlogModal}
        closeModal={closeAddBlogModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Add New Blog
        </Dialog.Title>
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Blog Heading
        </label>
        <input
          type="text"
          id="blog_heading"
          placeholder="Enter blog heading here"
          className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
        />
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Blog Content
        </label>
        <textarea
          placeholder="Enter text here"
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
          Save
        </button>
      </Modal>
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
          placeholder="Enter blog heading here"
          className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
        />
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Blog Content
        </label>
        <textarea
          placeholder="Enter text here"
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
      <ModalOverlay isOpen={isAddBlogModal} />
    </AppLayout>
  );
}
