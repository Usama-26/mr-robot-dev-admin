import BlogCard from "@/components/BlogCard";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function BlogManagement() {
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  function openBlogModal() {
    setIsBlogModalOpen(true);
  }
  function closeBlogModal() {
    setIsBlogModalOpen(false);
  }
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="font-bold text-2xl text-black mb-4">
            Blog Management
          </h1>
          <button
            onClick={openBlogModal}
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
    </AppLayout>
  );
}
