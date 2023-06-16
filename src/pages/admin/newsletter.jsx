import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
const subscribed_user = [
  {
    sr_no: "1",
    email: "jonajinton@gmail.com",
    date: "02/13/2022",
    status: "subscribed",
  },
  {
    sr_no: "2",
    email: "maryhudson@gmail.com",
    date: "02/12/2022",
    status: "subscribed",
  },
  {
    sr_no: "3",
    email: "janesmith@gmail.com",
    date: "02/11/2022",
    status: "unsubscribed",
  },
];
const unsubscribed_user = [
  {
    sr_no: "1",
    email: "jonajinton@gmail.com",
    date: "02/13/2022",
    unsubscribed_by: "Predrag",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ea corrupti ad alias voluptate. Ullam rerum quae fugiat quam culpa.",
  },
  {
    sr_no: "2",
    email: "maryhudson@gmail.com",
    date: "02/12/2022",
    unsubscribed_by: "Predrag",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ea corrupti ad alias voluptate. Ullam rerum quae fugiat quam culpa.",
  },
  {
    sr_no: "3",
    email: "janesmith@gmail.com",
    date: "02/11/2022",
    unsubscribed_by: "Predrag",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ea corrupti ad alias voluptate. Ullam rerum quae fugiat quam culpa.",
  },
];
export default function Newsletter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData({});
  }
  return (
    <>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
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
                    Total: {subscribed_user.length}
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
                      {subscribed_user.map(({ sr_no, email, date, status }) => (
                        <>
                          <tr
                            key={sr_no}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">{sr_no}</td>
                            <td className="table-cell"> {email}</td>
                            <td className="table-cell">{date}</td>
                            <td className="table-cell">
                              <button
                                onClick={() => {
                                  openModal(),
                                    setModalData(
                                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus nobis ipsa quibusdam perspiciatis, sed delectus doloribus minus autem harum animi."
                                    );
                                }}
                                className="bg-black p-1 rounded-lg"
                              >
                                <RiPencilFill className="w-6 h-6 fill-white" />
                              </button>
                            </td>
                            <td className="table-cell">
                              <span
                                className={`font-medium capitalize ${
                                  status === "subscribed"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Unsubscribed Users
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {unsubscribed_user.length}
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
                      {unsubscribed_user.map(
                        ({ sr_no, email, date, unsubscribed_by, note }) => (
                          <>
                            <tr
                              key={sr_no}
                              className="even:bg-slate-100 odd:bg-white"
                            >
                              <td className="table-cell">{sr_no}</td>
                              <td className="table-cell"> {email}</td>
                              <td className="table-cell">{date}</td>
                              <td className="table-cell">{unsubscribed_by}</td>
                              <td className="table-cell">
                                <button
                                  onClick={() => {
                                    openModal(),
                                      setModalData(
                                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus nobis ipsa quibusdam perspiciatis, sed delectus doloribus minus autem harum animi."
                                      );
                                  }}
                                  className="py-2 px-8 rounded-full text-white bg-black"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          </>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Modal
        isOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        data={modalData}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center"
        >
          Reason of Unsubscribe
        </Dialog.Title>
        <textarea
          defaultValue={modalData}
          className="border border-gray-900 rounded-lg my-8 p-4 w-full h-48 resize-none"
        ></textarea>
        <div className="my-4">
          <h5>Choose Status:</h5>
          <div className="flex">
            <input type="radio" name="status" id="inactive" checked />
            <label htmlFor="inactive" className="ml-10">
              Subscribe
            </label>
          </div>
          <div className="flex">
            <input type="radio" name="status" id="active" />
            <label htmlFor="active" className="ml-10">
              Unsubscribe
            </label>
          </div>
        </div>
      </Modal>
      <ModalOverlay isOpen={isModalOpen} />
    </>
  );
}
