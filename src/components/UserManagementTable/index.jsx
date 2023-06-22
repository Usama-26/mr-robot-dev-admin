import { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import Modal from "../Modal";
import ModalOverlay from "../ModalOverlay";
import { Fragment } from "react";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { sendInvite } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getUsers } from "@/redux/auth/auth.actions";
import { updateUser } from "@/redux/auth/auth.actions";
import { getGroup } from "@/redux/features/features.actions";
import Pagination from "../pagination";
import moment from "moment";

export default function UserManagementTable({
  heading,
  headers,
  data,
  member,
  userData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const usersData = useSelector(({ auth }) => auth.users);
  const groups = useSelector(({ features }) => features.groups);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupUpdate, setSelectedGroupUpdate] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const handleData = (key, value) => {
    setModalData({ ...modalData, [key]: value });
  };

  console.log("Selected Group", selectedGroup);

  useEffect(() => {
    getUsers1(currentPage);
    dispatch(getGroup());
  }, []);

  useEffect(() => {
    if (groups?.results?.length > 0) {
      setSelectedGroup(groups.results[0]);
      setSelectedGroupUpdate(groups.results[0]);
    }
  }, [groups]);

  const getUsers1 = (page) => {
    let status = "isApproved";
    let value = true;
    dispatch(getUsers(page, member, status, value));
  };

  const handleLoading = () => {
    setLoading(false);
    setIsAddStaffOpen(false);
    setEmail("");
    setSelectedGroup(groups.results[0]);
  };
  function openAddStaffModal() {
    setIsAddStaffOpen(true);
  }
  function closeAddStaffModal() {
    setIsAddStaffOpen(false);
    setEmail("");
    setSelectedGroup(groups.results[0]);
  }
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email: email,
      group: selectedGroup.id,
    };
    if (email === "") {
      toast.error("Please enter email", {});
    } else {
      console.log("Payload", payload);
      dispatch(sendInvite(payload, handleLoading));
    }
  };

  const handleCallBack = () => {
    getUsers1();
    closeModal();
  };

  const handleUpdate = () => {
    let id = modalData.id;
    let payload;
    if (member === "staff") {
      payload = {
        firstName: modalData.firstName,
        phoneNo: modalData.phoneNo,
        group: selectedGroupUpdate.id,
        isActive: modalData.isActive,
      };
    } else {
      payload = {
        isActive: modalData.isActive,
      };
    }

    dispatch(updateUser(payload, id, handleCallBack));
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
      {userData?.group?.permissions?.find(
        (permission) => permission.route === "User Management"
      )?.create && (
        <>
          {member === "staff" && (
            <button
              onClick={openAddStaffModal}
              className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both lg:-mt-20`}
            >
              <FaPlus className="inline w-4 h-4 mr-2 " />
              Add Staff
            </button>
          )}
        </>
      )}

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
              <tr key={index} className="even:bg-slate-100 odd:bg-white">
                <td className="table-cell">
                  {index + 1 + (currentPage - 1) * recordsPerPage}
                </td>
                <td className="table-cell">{item?.firstName}</td>
                <td className="table-cell"> {item?.email}</td>
                <td className="table-cell"> {item?.phoneNo}</td>
                <td className="table-cell"> {item?.group?.groupName}</td>
                <td className="table-cell">
                  <span
                    className={`p-3 inline-block w-3 h-3 rounded-full ${
                      item?.isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></span>
                </td>
                <td className="table-cell">
                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="table-cell">{item?.signedUpBy}</td>
                <td className="table-cell">
                  {userData?.group?.permissions?.find(
                    (permission) => permission.route === "User Management"
                  )?.update && (
                    <button
                      onClick={() => {
                        openModal(), setModalData(item);
                      }}
                      className="bg-red-500 p-1 rounded-lg"
                    >
                      <RiPencilFill className="w-6 h-6 fill-white" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          data={modalData}
        >
          <Dialog.Title
            as="h3"
            className="text-2xl font-bold leading-6 text-black text-center"
          >
            {member === "staff" ? "Edit Staff Details" : "Client Status"}
          </Dialog.Title>
          {member === "staff" ? (
            <>
              <div className="p-4">
                <label htmlFor="display_name" className="mb-2 block">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={modalData?.firstName}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                  value={modalData?.firstName}
                  onChange={(e) => handleData("firstName", e.target.value)}
                />
                <label htmlFor="display_name" className="mb-2 block">
                  Enter Email Address
                </label>
                <input
                  type="text"
                  defaultValue={modalData?.email}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                  value={modalData?.email}
                  onChange={(e) => handleData("email", e.target.value)}
                />
                <label htmlFor="display_name" className="mb-2 block">
                  Enter Phone Number
                </label>
                <input
                  type="text"
                  defaultValue={modalData?.phoneNo}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                  value={modalData?.phoneNo}
                  onChange={(e) => handleData("phoneNo", e.target.value)}
                />
                <div className="relative mb-5">
                  <h5 className="mb-2 block">Select Group</h5>
                  <Listbox
                    value={selectedGroupUpdate}
                    onChange={setSelectedGroupUpdate}
                  >
                    <Listbox.Button
                      className={
                        "border border-gray-500 rounded-full w-full inline-flex justify-between items-center text-left py-2 px-4"
                      }
                    >
                      {selectedGroupUpdate?.groupName}
                      <FaChevronDown className=" inline" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute bg-white w-full border border-gray-500 rounded-2xl mt-1">
                      {groups?.results?.map((group, index) => (
                        <Listbox.Option as={"ul"} key={index} value={group}>
                          {({ active }) => (
                            <li
                              className={` p-2 ${active ? "bg-gray-400" : ""}`}
                            >
                              {group?.groupName}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>

                <div className="my-4">
                  <h5>Staff Status:</h5>
                  <div className="flex">
                    <input
                      type="radio"
                      name="status"
                      id="inactive"
                      value={false}
                      checked={modalData?.isActive ? false : true}
                      onChange={(e) =>
                        handleData(
                          "isActive",
                          e.target.value === "false" ? false : false
                        )
                      }
                    />
                    <label htmlFor="inactive" className="ml-10">
                      Inactive
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="status"
                      id="active"
                      value={true}
                      checked={modalData?.isActive}
                      onChange={(e) =>
                        handleData(
                          "isActive",
                          e.target.value === "true" ? true : true
                        )
                      }
                    />
                    <label htmlFor="active" className="ml-10">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mx-10">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="bg-black text-white px-10 py-2 rounded-full text-lg font-semibold inline-block"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate()}
                  className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
                >
                  Save & Edit
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-20 flex justify-between my-10">
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    className="mr-5"
                    value={true}
                    checked={modalData?.isActive}
                    onChange={(e) =>
                      handleData(
                        "isActive",
                        e.target.value === "true" ? true : true
                      )
                    }
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    className="mr-5"
                    value={false}
                    checked={modalData?.isActive ? false : true}
                    onChange={(e) =>
                      handleData(
                        "isActive",
                        e.target.value === "false" ? false : false
                      )
                    }
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleUpdate()}
                className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold block mx-auto "
              >
                Save
              </button>
            </>
          )}
        </Modal>
        <Modal
          isOpen={isAddStaffOpen}
          openModal={openAddStaffModal}
          closeModal={closeAddStaffModal}
        >
          <Dialog.Title
            as="h3"
            className="text-2xl font-bold leading-6 text-black text-center"
          >
            Add Staff
          </Dialog.Title>
          <div className="p-8">
            <label htmlFor="display_name" className="mb-2 block">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative mb-5">
              <h5 className="mb-2 block"> Group</h5>
              <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                <Listbox.Button
                  className={
                    "border border-gray-500 rounded-full w-full inline-flex justify-between items-center text-left py-2 px-4"
                  }
                >
                  {selectedGroup?.groupName}
                  <FaChevronDown className=" inline" />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white w-full border border-gray-500 rounded-2xl mt-1">
                  {groups?.results?.map((group, index) => (
                    <Listbox.Option as={"ul"} key={index} value={group}>
                      {({ active }) => (
                        <li className={` p-2 ${active ? "bg-gray-400" : ""}`}>
                          {group?.groupName}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
          <div className="flex justify-between mx-10">
            <button
              type="button"
              onClick={closeAddStaffModal}
              className="bg-black text-white px-10 py-2 rounded-full text-lg font-semibold inline-block"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
            >
              Send Invite
            </button>
          </div>
        </Modal>
        <ModalOverlay isOpen={isModalOpen || isAddStaffOpen} />
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
