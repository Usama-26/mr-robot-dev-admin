import { useState, useEffect } from "react";
import MesssageModal from "../MessageModal";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "@/redux/features/features.actions";
import { useRouter } from "next/router";
import Pagination from "../pagination";
import moment from "moment";

const TABLE_HEAD = ["Sr.No", "Email", "Full Name", "Phone", "Date", "Message"];
export default function ContactUsTable() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const contactsData = useSelector(({ features }) => features.contacts);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    getcontacts();
  }, []);

  const getcontacts = () => {
    let filter = "Contact us";
    dispatch(getContacts(filter, 1));
  };

  function hideMessage() {
    setIsMessageVisible(false);
  }

  function showMessage(e) {
    setMessage(e.target.dataset.message);
    setIsMessageVisible(true);
  }

  const fetchNextRecords = (number) => {
    let filter = "Contact us";
    dispatch(getContacts(filter, number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-black mb-4">Our Clients</h1>
      <div className="overflow-auto table-height w-full">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className="bg-indigo-950  sticky top-0">
            <tr>
              {TABLE_HEAD.map((header) => (
                <th key={header} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contactsData?.results?.map((item, index) => {
              return (
                <tr key={index} className="even:bg-slate-100 odd:bg-white">
                  <td className="table-cell">
                    {" "}
                    {index + 1 + (currentPage - 1) * recordsPerPage}
                  </td>
                  <td className="table-cell">{item?.email}</td>
                  <td className="table-cell"> {item?.fullName}</td>
                  <td className="table-cell"> {item?.phoneNo}</td>
                  <td className="table-cell">
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={showMessage}
                      data-message={item?.message}
                      className="bg-black text-white px-6 py-2 rounded-full"
                    >
                      View Message
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <MesssageModal
          message={message}
          isOpen={isMessageVisible}
          openModal={showMessage}
          closeModal={hideMessage}
        />
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
              contactsData?.totalResults
            )}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {contactsData.totalResults}
          </span>
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={contactsData.totalPages}
          handleClick={handleClick}
        />
      </nav>
    </>
  );
}
