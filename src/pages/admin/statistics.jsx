import { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Pagination from "@/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getStats, getContacts } from "@/redux/features/features.actions";
const tabs = ["Total Visitors", "Submitted Forms", "Active Visitors"];
import { withAuth } from "@/components/Helpers/withAuth";
import moment from "moment";
const Statistics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContacts, setCurrentPageContacts] = useState(1);
  const [recordsPerPage] = useState(10);
  const dispatch = useDispatch();
  const statsData = useSelector(({ features }) => features.stats);
  const contactsData = useSelector(({ features }) => features.contacts);

  useEffect(() => {
    getStatsData(currentPage);
    getContactsData(currentPageContacts);
  }, []);

  const getStatsData = (page) => {
    dispatch(getStats(page));
  };
  const getContactsData = (page) => {
    dispatch(getContacts("ALL", page));
  };

  const fetchNextRecords = (number) => {
    dispatch(getStats(number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };
  const handleClickContacts = (pageNumber) => {
    setCurrentPageContacts(pageNumber);
    getContactsData(pageNumber);
  };
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            {tabs.map((tab) => (
              <Tab key={tab} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                      selected ? "bg-[#D32A3D]" : "bg-slate-300"
                    }`}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total Visitors
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {statsData?.totalResults}
                  </h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {["S.No", "IP Address", "Country", "Time", "Date"].map(
                          (header) => (
                            <th key={header} className="table-header">
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {statsData?.results?.map((item, index) => (
                        <>
                          <tr>
                            <td className="table-cell">
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item.ipAddress}</td>
                            <td className="table-cell">{item.country}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("LT")}
                            </td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
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
                        statsData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {statsData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={statsData.totalPages}
                    handleClick={handleClick}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Submitted Forms
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {contactsData?.totalResults}
                  </h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "Email",
                          "Fullname",
                          "Date",
                          "Phone",
                          "Form",
                          "Status",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contactsData?.results?.map((item, index) => (
                        <>
                          <tr>
                            <td className="table-cell">
                              {" "}
                              {index +
                                1 +
                                (currentPageContacts - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item.email}</td>
                            <td className="table-cell">{item.fullName}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">{item?.phoneNo}</td>
                            <td className="table-cell">{item.type}</td>
                            <td className="table-cell">
                              <span className="text-green-500 font-medium">
                                Submitted
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
                      {`${(currentPageContacts - 1) * 10 + 1}-${Math.min(
                        currentPageContacts * 10,
                        contactsData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {contactsData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPageContacts}
                    totalPages={contactsData.totalPages}
                    handleClick={handleClickContacts}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Active Vistors
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">Total:</h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "IP Address",
                          "Country",
                          "Date",
                          "Status",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-cell">1</td>
                        <td className="table-cell">464t8er3rjiwoefq</td>
                        <td className="table-cell">Australia</td>
                        <td className="table-cell">2/12/2023</td>
                        <td className="table-cell">
                          <span
                            className={`rounded-full h-4 w-4 inline-block bg-green-500`}
                          ></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
};
export default withAuth(Statistics);
