/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import BlogCard from "@/components/BlogCard";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { getBlogs, addBlogs } from "@/redux/features/features.actions";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/components/Helpers/withAuth";

const BlogManagement = (props) => {
  const userData = props.userData;
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const blogs = useSelector(({ features }) => features.blogs);
  const [payloaddata, setPayloadData] = useState({
    name: "",
    description: "",
    logo: "",
  });
  const [url, updateUrl] = useState();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };
  console.log("Blogs", blogs);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
  }, []);

  const getblogs = () => {
    dispatch(getBlogs());
  };
  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file here
    console.log(file);
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
        console.log("Upload success:", response.data.secure_url);
        updateUrl(response.data.secure_url);
        handleData("logo", response.data.secure_url);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Icon upload error, try again!!!", {});
      });
  }

  const handleLoading = () => {
    setLoading(false);
    closeAddBlogModal();
    dispatch(getBlogs());
    updateUrl();
    let defaultValue = {
      name: "",
      description: "",
      logo: "",
    };
    setPayloadData(defaultValue);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Payload Data", payloaddata);
    dispatch(addBlogs(payloaddata, handleLoading));
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="font-bold text-2xl text-black mb-4">
            Blog Management
          </h1>
          {userData?.group?.permissions?.find(
            (permission) => permission.route === "Blog Management Screen"
          )?.create && (
            <button
              onClick={openAddBlogModal}
              className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both`}
            >
              <FaPlus className="inline w-4 h-4 mr-2 " />
              Add New Blog
            </button>
          )}
        </div>
        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {blogs?.map((blog) => (
            <>
              <BlogCard data={blog} userData={userData} />
            </>
          ))}
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
        <form action="" onSubmit={(e) => handleDataSubmit(e)}>
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Heading
          </label>
          <input
            type="text"
            id="blog_heading"
            placeholder="Enter blog heading here"
            className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
            value={payloaddata.name}
            onChange={(e) => handleData("name", e.target.value)}
            required
          />
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Content
          </label>
          <textarea
            placeholder="Enter text here"
            className="border border-gray-500 rounded-lg p-4 mb-4 w-full h-48 resize-none"
            value={payloaddata.description}
            onChange={(e) => handleData("description", e.target.value)}
            required
          ></textarea>
          <div className="border border-dashed border-gray-500 rounded-xl p-8 mb-4">
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-black text-white px-10 py-2 rounded-full font-semibold block mx-auto"
            >
              Choose image to Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          {url && (
            <div className="mt-4 flex justify-center mb-4">
              <img src={url} alt="" className="w-[100px] h-[80px]" />
            </div>
          )}
          <button
            type="submit"
            className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
          >
            Save
          </button>
        </form>
      </Modal>

      <ModalOverlay isOpen={isAddBlogModal} />
    </AppLayout>
  );
};

export default withAuth(BlogManagement);
