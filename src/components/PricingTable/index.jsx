/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import GlassCard from "../GlassCard";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import {
  addPricingItems,
  updatePricingItems,
} from "@/redux/features/features.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { getPricingItems } from "@/redux/features/features.actions";
import { toast } from "react-toastify";
import { baseUrl } from "@/repositories/genericRepository";
import ModalOverlay from "../ModalOverlay";

export default function PricingTable({ headers, data, userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [file, setFile] = useState();
  const [url, updateUrl] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [itemID, setItemID] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [payloaddata, setPayloadData] = useState({
    name: "",
    description: "",
    price: "",
    logo: "",
    type: headers[1],
  });

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
    closeModal();
    dispatch(getPricingItems());
    updateUrl();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file here
    console.log(file);
    handleUpload(file);
  };

  function handleUpload(d) {
    const file = d;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mrrobotdev"); // replace with your upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/arslanvirk/image/upload", formData)
      .then((response) => {
        console.log("Upload success:", response.data.secure_url);
        updateUrl(response.data.secure_url);
        handleData("logo", response.data.secure_url);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Icon upload error, try again!!!", {});
      });
  }

  const handleDataSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(addPricingItems(payloaddata, handleLoading));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const filteredPayloadData = Object.entries(payloaddata).reduce(
      (acc, [key, value]) => {
        if (value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    dispatch(
      updatePricingItems(filteredPayloadData, modalData._id, handleLoading)
    );
  };

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
  }
  function openDeleteModal() {
    setIsDeleteModal(true);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/pricingitems/${itemID}`);
      toast.success("Item Deleted Successfully", {});
      dispatch(getPricingItems());
      closeDeleteModal();
    } catch (e) {
      toast.error("An error occured!!!", {});
      console.log("Error", e);
    }
  };

  return (
    <>
      {(userData.role === "admin" ||
        userData?.group?.permissions?.find(
          (permission) => permission.route === "App Pricing Screen"
        )?.create) && (
        <button
          onClick={openModal}
          className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both lg:-mt-20`}
        >
          <FaPlus className="inline w-4 h-4 mr-2 " />
          Add {headers[1]}
        </button>
      )}

      <div className="overflow-auto table-height rounded-t-xl w-full">
        <table className="w-full min-w-max table-auto text-center rounded-t-lg border-collapse relative ">
          <thead className="bg-[#D9D9D9] sticky top-0 p-4">
            <tr className="rounded-t-lg">
              {headers.map((header) => (
                <th key={header} className="p-4 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#232323] text-white font-semibold relative z-0">
            {data?.map((item, index) => (
              <tr key={index} className="text-xl">
                <td className="border border-gray-700 w-20">{index + 1}</td>
                <td className="border py-4 border-gray-700">
                  <GlassCard image={item.logo} title={item.name} />
                </td>
                <td className="border border-gray-700"> R {item.price}</td>
                <td className="table-cell border border-gray-700">
                  <div className="flex flex-col justify-center items-center gap-4">
                    {(userData.role === "admin" ||
                      userData?.group?.permissions?.find(
                        (permission) =>
                          permission.route === "App Pricing Screen"
                      )?.update) && (
                      <button
                        onClick={() => {
                          openModal();
                          setModalData(item);
                        }}
                        className="bg-black text-white px-10 py-3 rounded-full"
                      >
                        Edit
                      </button>
                    )}

                    {(userData.role === "admin" ||
                      userData?.group?.permissions?.find(
                        (permission) =>
                          permission.route === "App Pricing Screen"
                      )?.delete) && (
                      <button
                        onClick={() => {
                          openDeleteModal();
                          setItemID(item._id);
                        }}
                        className="bg-red-600 text-white px-7 py-3 rounded-full"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isDeleteModal}
          openModal={openDeleteModal}
          closeModal={closeDeleteModal}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-black text-center mb-4"
          >
            Are you sure want to delete this Item?
          </Dialog.Title>
          <div className=" mx-auto w-56 flex justify-between mt-4">
            <button
              onClick={() => deleteItem()}
              className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
            >
              Yes
            </button>
            <button
              onClick={() => closeDeleteModal()}
              className="text-white inline-block bg-black font-medium px-6 py-2 rounded-full"
            >
              No
            </button>
          </div>
        </Modal>
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
            Add {headers[1]}
          </Dialog.Title>
          <form
            className="mx-5 mt-5 rounded-xl"
            onSubmit={(e) => {
              modalData ? handleSubmitUpdate(e) : handleDataSubmit(e);
            }}
          >
            <label htmlFor="title" className="mb-2 text-black">
              {headers[1]} Title
            </label>
            <input
              id="title"
              defaultValue={modalData ? modalData.name : ""}
              type="text"
              className="block w-full py-2 px-4 rounded-full border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
              value={data?.name}
              onChange={(e) => handleData("name", e.target.value)}
              required
            />
            <label htmlFor="title" className="mb-2 text-black">
              {headers[1]} Description
            </label>
            <textarea
              defaultValue={modalData ? modalData.description : ""}
              name="description"
              id="description"
              className="block w-full py-2 px-4 h-40 resize-none rounded-xl border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
              placeholder={`Enter ${headers[1]} Description`}
              value={data?.description}
              onChange={(e) => handleData("description", e.target.value)}
              required
            ></textarea>
            <label htmlFor="title" className="mb-2 text-black">
              Enter Your Price
            </label>
            <input
              id="title"
              defaultValue={modalData ? modalData.price : ""}
              type="text"
              className="block w-full py-2 px-4 rounded-full border-gray-300 border outline-gray-400 placeholder:text-sm text-sm mb-4"
              placeholder="Price is always enter in ZAR (R)"
              value={data?.price}
              onChange={(e) => handleData("price", e.target.value)}
              required
            />
            <div className="border border-dashed border-gray-500 rounded-xl p-8 mb-4">
              <button
                type="button"
                onClick={handleButtonClick}
                className="bg-black text-white px-10 py-2 rounded-full font-semibold block mx-auto"
              >
                Choose icon to Upload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            {url && (
              <div className="mt-4 flex justify-center mb-4">
                <img src={url} alt="" className="w-[50px] h-[50px]" />
              </div>
            )}
            {modalData && !url && (
              <div className="mt-4 flex justify-center mb-4">
                <img
                  src={modalData?.logo}
                  alt=""
                  className="w-[50px] h-[50px]"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-red-600 text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
            >
              {modalData ? "Save" : "Add"}
            </button>
          </form>
        </Modal>
      </div>
      <ModalOverlay isOpen={isModalOpen || isDeleteModal} />
    </>
  );
}
