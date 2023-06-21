import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { getUsers } from "@/redux/auth/auth.actions";
import { updateUser } from "@/redux/auth/auth.actions";
import { baseUrl } from "@/repositories/genericRepository";
import Pagination from "../pagination";
import moment from "moment";

export default function ApprovalsTable({ headers, heading, role, userData }) {
  const usersData = useSelector(({ auth }) => auth.users);
  const user = useSelector(({ auth }) => auth.user);
  console.log("Users Data", usersData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getUsers1(currentPage);
  }, []);

  const getUsers1 = (page) => {
    let status = "isApproved";
    let value = false;
    let status2 = "isActive";
    let value2 = true;
    dispatch(getUsers(page, role, status, value, status2, value2));
  };

  const handleCallBack = () => {
    getUsers1();
  };

  const handleApprove = (id) => {
    const payload = {
      isApproved: true,
      signedUpBy: user.firstName,
    };
    console.log("Payload", payload);
    dispatch(updateUser(payload, id, handleCallBack));
  };

  const handleDelete = async (id) => {
    const payload = {
      isActive: false,
      signedUpBy: user.firstName,
    };
    console.log("Payload", payload);
    dispatch(updateUser(payload, id, handleCallBack));
    // try {
    //   const response = await axios.delete(`${baseUrl}/users/${id}`);
    //   toast.success("Request Declined Successfully", {});
    //   getUsers1();
    // } catch (e) {
    //   toast.error(e?.response?.data?.message, {});
    //   console.log("Error Post", e);
    // }
  };

  const fetchNextRecords = (number) => {
    getUsers1(number);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-black mb-4">{heading}</h1>
        <h1 className="font-bold text-2xl text-black mb-4">
          Total: {usersData?.totalResults}
        </h1>
      </div>
      <div className="overflow-auto table-height w-full">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className="bg-indigo-950  sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData?.results?.map((item, index) => (
              <>
                <>
                  <tr key={index} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">
                      {" "}
                      {index + 1 + (currentPage - 1) * recordsPerPage}
                    </td>
                    <td className="table-cell">{item.firstName}</td>
                    <td className="table-cell"> {item.surName}</td>
                    <td className="table-cell"> {item.email}</td>
                    <td className="table-cell"> {item.phoneNo}</td>
                    <td className="table-cell">{item?.country}</td>
                    <td className="table-cell">
                      {moment(item?.createdAt).format("DD/MM/YYYY")}
                    </td>
                    {/* {status && <td className="table-cell">{status}</td>} */}
                    <td className="table-cell">
                      {userData?.group?.permissions?.find(
                        (permission) => permission.route === "Signup Approvals"
                      )?.update && (
                        <>
                          {" "}
                          <button
                            type="button"
                            className="bg-green-600 text-white px-6 py-2 rounded-full mr-2"
                            onClick={() => handleApprove(item.id)}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="bg-red-600 text-white px-6 py-2 rounded-full"
                            onClick={() => handleDelete(item.id)}
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </>
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
              usersData?.totalResults
            )}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {usersData.totalResults}
          </span>
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={usersData.totalPages}
          handleClick={handleClick}
        />
      </nav>
    </>
  );
}
