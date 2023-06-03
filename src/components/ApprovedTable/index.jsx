import { RiPencilFill } from "react-icons/ri";
import Modal from "../Modal";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ModalOverlay from "../ModalOverlay";
export default function ApprovedTable({ data, headers, heading }) {
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
            {data.map(
              ({
                sr_no,
                email,
                phone,
                first_name,
                date,
                country,
                sur_name,
                signedup_by,
                status,
              }) => (
                <tr key={sr_no} className="even:bg-slate-100 odd:bg-white">
                  <td className="table-cell">{sr_no}</td>
                  <td className="table-cell">{first_name}</td>
                  <td className="table-cell"> {sur_name}</td>
                  <td className="table-cell"> {email}</td>
                  <td className="table-cell"> {phone}</td>
                  <td className="table-cell">{country}</td>
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
                  <td className="table-cell">{date}</td>
                  <td className="table-cell">{signedup_by}</td>
                  <td className="table-cell">
                    <span className="rounded-full bg-green-600 text-white py-2 px-4">
                      {status}
                    </span>
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
            className="text-lg font-medium leading-6 text-black text-center"
          >
            Reason of Inactive
          </Dialog.Title>
          <div className="my-4">
            <h5>Choose Status:</h5>
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
          <textarea
            defaultValue={modalData}
            className="border border-gray-900 rounded-lg my-8 p-4 w-full h-48 resize-none"
          ></textarea>
          <button
            type="button"
            onClick={() => {}}
            className="bg-red-600 text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
          >
            Save
          </button>
        </Modal>
        <ModalOverlay isOpen={isModalOpen} />
      </div>
    </>
  );
}
