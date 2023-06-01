import { useState } from "react";
import GlassCard from "../GlassCard";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";

export default function PricingTable({ headers, data }) {
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
      <button
        onClick={openModal}
        className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both -mt-20`}
      >
        <FaPlus className="inline w-4 h-4 mr-2 " />
        Add {headers[1]}
      </button>

      <div className="overflow-auto table-height rounded-t-xl w-full">
        <table className="w-full min-w-max table-auto text-center rounded-t-lg border-collapse relative ">
          <thead className="bg-[#D9D9D9] sticky top-0 p-4 z-10">
            <tr className="rounded-t-lg">
              {headers.map((header) => (
                <th key={header} className="p-4 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#232323] text-white font-semibold relative z-0">
            {data.map((item) => (
              <tr key={item.sr_no} className="text-xl">
                <td className="border border-gray-700 w-20">{item.sr_no}</td>
                <td className="border py-4 border-gray-700">
                  <GlassCard image={item.icon} title={item.title} />
                </td>
                <td className="border border-gray-700"> R {item.price}</td>
                <td className="table-cell border border-gray-700">
                  <button
                    onClick={() => {
                      openModal();
                      setModalData(item);
                    }}
                    className="bg-red-600 text-white px-10 py-3 rounded-full"
                  >
                    Edit
                  </button>
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
            className="text-lg font-medium leading-6 text-black text-center"
          >
            Edit {headers[1]}
          </Dialog.Title>
          <div className="mx-5 mt-5 rounded-xl">
            <label htmlFor="title" className="mb-2 text-black">
              {headers[1]} Title
            </label>
            <input
              id="title"
              defaultValue={modalData ? modalData.title : ""}
              type="text"
              className="block w-full py-2 px-4 rounded-full border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
            />
            <label htmlFor="title" className="mb-2 text-black">
              {headers[1]} Description
            </label>
            <textarea
              defaultValue={modalData ? modalData.desc : ""}
              name="description"
              id="description"
              className="block w-full py-2 px-4 h-40 resize-none rounded-xl border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
              placeholder={`Enter ${headers[1]} Description`}
            ></textarea>
            <label htmlFor="title" className="mb-2 text-black">
              Enter Your Price
            </label>
            <input
              id="title"
              defaultValue={modalData ? modalData.price : ""}
              type="number"
              className="block w-full py-2 px-4 rounded-full border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
              placeholder="Price is always enter in ZAR (R)"
            />
            <div className="border border-dashed border-gray-500 rounded-xl p-8 mb-4">
              <button
                type="button"
                onClick={() => {}}
                className="bg-black text-white px-10 py-2 rounded-full font-semibold block mx-auto"
              >
                Choose icon to Upload
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {}}
            className="bg-red-600 text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
          >
            {modalData ? "Save" : "Add"}
          </button>
        </Modal>
      </div>
    </>
  );
}
