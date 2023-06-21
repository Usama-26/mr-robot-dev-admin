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
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import moment from "moment";

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
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

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
      <ModalOverlay isOpen={isModalOpen} />
    </AppLayout>
  );
};
export default withAuth(Newsletter);
