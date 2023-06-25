/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { Fragment } from "react";
import { RiPencilFill } from "react-icons/ri";
import { withAuth } from "@/components/Helpers/withAuth";
import { getNewsLetter } from "@/redux/features/features.actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "@/repositories/genericRepository";
import NewsletterCard from "@/components/NewsletterCard";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import {
  getNewsletterData,
  addNewsletter,
} from "@/redux/features/features.actions";

const Newsletter = (props) => {
  const userData = props.userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalDataUnsub, setModalDataUnSub] = useState();
  const newsLetterData = useSelector(({ features }) => features.newsLetter);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUnsub, setCurrentPageUnsub] = useState(1);
  const [recordsPerPage] = useState(10);
  const [tab, selectedTab] = useState("subscribed");
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector(({ features }) => features.newsletterData);

  const [payloaddata, setPayloadData] = useState({
    name: "",
    description: "",
  });

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };

  useEffect(() => {
    getnewsletterdata();
  }, []);

  const getnewsletterdata = () => {
    dispatch(getNewsletterData());
  };

  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
    setModalDataUnSub();
    setReason("");
  }

  useEffect(() => {
    getnewsletter("subscribed");
  }, []);

  const getnewsletter = (value, page) => {
    dispatch(getNewsLetter(value, page));
  };

  const updateData = async (e) => {
    e.preventDefault();
    const payload = {
      status: "unsubscribed",
      reason: reason,
      unsubscribedBy: userData.firstName,
    };
    if (reason == "") {
      toast.error("Please enter reason!!", {});
    } else {
      try {
        const response = axios.put(
          `${baseUrl}/users/newsletterusers/${modalData.id}`,
          payload
        );
        toast.success("User unsubscribed successfully", {});
        setModalData();
        setReason("");
        closeModal();
        getnewsletter("subscribed", currentPage);
      } catch (error) {
        toast.error(error, {});
      }
    }
  };

  const fetchNextRecords = (value, number) => {
    dispatch(getNewsLetter(value, number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords("subscribed", pageNumber);
  };

  const handleClickUnsub = (pageNumber) => {
    setCurrentPageUnsub(pageNumber);
    fetchNextRecords("unsubscribed", pageNumber);
  };

  const handleLoading = () => {
    setLoading(false);
    closeAddBlogModal();
    dispatch(getNewsletterData());
    let defaultValue = {
      name: "",
      description: "",
    };
    setPayloadData(defaultValue);
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Payload Data", payloaddata);
    dispatch(addNewsletter(payloaddata, handleLoading));
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  onClick={() => {
                    getnewsletter("subscribed", currentPage),
                      setCurrentPageUnsub(1);
                  }}
                >
                  Subscribed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  onClick={() => {
                    getnewsletter("unsubscribed", currentPageUnsub),
                      setCurrentPage(1);
                  }}
                >
                  Unsubscribed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  // onClick={() => {
                  //   getnewsletter("unsubscribed", currentPageUnsub),
                  //     setCurrentPage(1);
                  // }}
                >
                  Manage Newsletter
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Subscribed Users
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {newsLetterData?.totalResults}
                  </h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950  sticky top-0">
                      <tr>
                        {["S.No", "Email", "Date", "Action", "Status"].map(
                          (header) => (
                            <th key={header} className="table-header">
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {newsLetterData?.results?.map((item, index) => (
                        <>
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">
                              {" "}
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell"> {item.email}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">
                              {userData?.group?.permissions?.find(
                                (permission) =>
                                  permission.route === "Newsletter Screen"
                              )?.update && (
                                <button
                                  onClick={() => {
                                    openModal(), setModalData(item);
                                  }}
                                  className="bg-black p-1 rounded-lg"
                                >
                                  <RiPencilFill className="w-6 h-6 fill-white" />
                                </button>
                              )}
                            </td>
                            <td className="table-cell">
                              <span
                                className={`font-medium capitalize text-green-500
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="flex md:flex-row flex-col justify-between items-center pt-4 mx-5 mb-5 mt-5"
                  aria-label="Table navigation"
                >
                  <span className="text-sm font-normal text-gray-500 ">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {`${(currentPage - 1) * 10 + 1}-${Math.min(
                        currentPage * 10,
                        newsLetterData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {newsLetterData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={newsLetterData.totalPages}
                    handleClick={handleClick}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Unsubscribed Users
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {newsLetterData?.totalResults}
                  </h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950  sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "Email",
                          "Date",
                          "Unsubscribed by",
                          "Note",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {newsLetterData?.results?.map((item, index) => (
                        <>
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">
                              {" "}
                              {index +
                                1 +
                                (currentPageUnsub - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell"> {item.email}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">
                              {item?.unsubscribedBy}
                            </td>
                            <td className="table-cell">
                              {userData?.group?.permissions?.find(
                                (permission) =>
                                  permission.route === "Newsletter Screen"
                              )?.update && (
                                <button
                                  onClick={() => {
                                    openModal(),
                                      setModalDataUnSub(item),
                                      setReason(item?.reason);
                                  }}
                                  className="py-2 px-8 rounded-full text-white bg-black"
                                >
                                  View Details
                                </button>
                              )}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="flex md:flex-row flex-col justify-between items-center pt-4 mx-5 mb-5 mt-5"
                  aria-label="Table navigation"
                >
                  <span className="text-sm font-normal text-gray-500 ">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {`${(currentPageUnsub - 1) * 10 + 1}-${Math.min(
                        currentPageUnsub * 10,
                        newsLetterData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {newsLetterData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPageUnsub}
                    totalPages={newsLetterData.totalPages}
                    handleClick={handleClickUnsub}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <div className="max-w-screen-2xl mx-auto  p-4">
                <div className="flex justify-between items-center mb-6 ">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Manage Newsletters
                  </h1>
                  {userData?.group?.permissions?.find(
                    (permission) => permission.route === "Newsletter Screen"
                  )?.create && (
                    <button
                      onClick={openAddBlogModal}
                      className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both`}
                    >
                      <FaPlus className="inline w-4 h-4 mr-2 " />
                      Add Newsletter
                    </button>
                  )}
                </div>
                <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
                  {blogs?.results?.map((blog) => (
                    <>
                      <NewsletterCard data={blog} userData={userData} />
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
                  Add New Newsletter
                </Dialog.Title>
                <form action="" onSubmit={(e) => handleDataSubmit(e)}>
                  <label
                    htmlFor="blog_heading"
                    className="mb-2 block font-bold"
                  >
                    Newsletter Heading
                  </label>
                  <input
                    type="text"
                    id="blog_heading"
                    placeholder="Enter newsletter heading here"
                    className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                    value={payloaddata.name}
                    onChange={(e) => handleData("name", e.target.value)}
                    required
                  />
                  <label
                    htmlFor="blog_heading"
                    className="mb-2 block font-bold"
                  >
                    Newsletter Content
                  </label>
                  <textarea
                    placeholder="Enter text here"
                    className="border border-gray-500 rounded-lg p-4 mb-4 w-full h-48 resize-none"
                    value={payloaddata.description}
                    onChange={(e) => handleData("description", e.target.value)}
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
                  >
                    Save
                  </button>
                </form>
              </Modal>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Modal isOpen={isModalOpen} openModal={openModal} closeModal={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center"
        >
          Reason of Unsubscribe
        </Dialog.Title>
        <textarea
          value={reason}
          className="border border-gray-900 rounded-lg my-8 p-4 w-full h-48 resize-none"
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
        ></textarea>
        <div className="my-0 flex justify-center">
          {modalData && (
            <button
              className="bg-red-500 px-4 py-2 rounded-full text-white"
              onClick={(e) => updateData(e)}
            >
              Unsubscribe
            </button>
          )}
        </div>
      </Modal>
      <ModalOverlay isOpen={isModalOpen || isAddBlogModal} />
    </AppLayout>
  );
};
export default withAuth(Newsletter);
