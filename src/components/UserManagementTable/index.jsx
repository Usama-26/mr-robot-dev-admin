import { Dialog } from "@headlessui/react";
import Modal from "../Modal";
import ModalOverlay from "../ModalOverlay";
import { useState } from "react";
import { RiPencilFill } from "react-icons/ri";

export default function UserManagementTable({
  heading,
  headers,
  data,
  member,
}) {
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
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-black mb-4">{heading}</h1>
        <h1 className="font-bold text-2xl text-black mb-4">
          Total: {data.length}
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
            {(member === "staff" &&
              data.map(
                ({
                  sr_no,
                  first_name,
                  title,
                  email,
                  phone,
                  date,
                  signedup_by,
                  status,
                }) => (
                  <tr key={sr_no} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">{sr_no}</td>
                    <td className="table-cell">{first_name}</td>
                    <td className="table-cell"> {email}</td>
                    <td className="table-cell"> {phone}</td>
                    <td className="table-cell"> {title}</td>
                    <td className="table-cell">
                      <span
                        className={`p-3 inline-block w-3 h-3 rounded-full ${
                          (status === "active" && "bg-green-600") ||
                          "bg-red-600"
                        }`}
                      ></span>
                    </td>
                    <td className="table-cell">{date}</td>
                    <td className="table-cell">{signedup_by}</td>
                    <td className="table-cell">
                      <button
                        onClick={() => {
                          openModal(),
                            setModalData({
                              first_name,
                              phone,
                              email,
                              title,
                              status,
                            });
                        }}
                        className="bg-black p-1 rounded-lg"
                      >
                        <RiPencilFill className="w-6 h-6 fill-white" />
                      </button>
                    </td>
                  </tr>
                )
              )) ||
              data.map(
                ({
                  sr_no,
                  full_name,
                  email,
                  phone,
                  company,
                  added_on,
                  member_since,
                  status,
                }) => (
                  <tr key={sr_no} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">{sr_no}</td>
                    <td className="table-cell">{full_name}</td>
                    <td className="table-cell">{email}</td>
                    <td className="table-cell">{phone}</td>
                    <td className="table-cell">{company}</td>
                    <td className="table-cell">{added_on}</td>
                    <td className="table-cell">{member_since}</td>
                    <td className="table-cell">
                      <span
                        className={`p-3 inline-block w-3 h-3 rounded-full ${
                          (status === "active" && "bg-green-600") ||
                          "bg-red-600"
                        }`}
                      ></span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => {
                          openModal(),
                            setModalData({
                              status,
                            });
                        }}
                        className="bg-black p-1 rounded-lg"
                      >
                        <RiPencilFill className="w-6 h-6 fill-white" />
                      </button>
                    </td>
                  </tr>
                )
              )}
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
                  defaultValue={modalData.first_name}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                />
                <label htmlFor="display_name" className="mb-2 block">
                  Enter Email Address
                </label>
                <input
                  type="text"
                  defaultValue={modalData.email}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                />
                <label htmlFor="display_name" className="mb-2 block">
                  Enter Phone Number
                </label>
                <input
                  type="text"
                  defaultValue={modalData.phone}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                />
                <label htmlFor="display_name" className="mb-2 block">
                  Enter Title
                </label>
                <input
                  type="text"
                  defaultValue={modalData.title}
                  className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                />

                <div className="my-4">
                  <h5>Staff Status:</h5>
                  <div className="flex">
                    <input type="radio" name="status" id="inactive" />
                    <label htmlFor="inactive" className="ml-10">
                      Inactive
                    </label>
                  </div>
                  <div className="flex">
                    <input type="radio" name="status" id="active" />
                    <label htmlFor="active" className="ml-10">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mx-10">
                <button
                  type="button"
                  onClick={() => {}}
                  className="bg-black text-white px-10 py-2 rounded-full text-lg font-semibold inline-block"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {}}
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
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    className="mr-5"
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold block mx-auto "
              >
                Save
              </button>
            </>
          )}
        </Modal>
        <ModalOverlay isOpen={isModalOpen} />
      </div>
    </>
  );
}
