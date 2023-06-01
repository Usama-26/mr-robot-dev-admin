import { useState } from "react";
import MesssageModal from "../MessageModal";

const TABLE_HEAD = ["Sr.No", "Email", "Full Name", "Phone", "Date", "Message"];
export default function ContactUsTable({ data }) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");

  function hideMessage() {
    setIsMessageVisible(false);
  }

  function showMessage(e) {
    setMessage(e.target.dataset.message);
    setIsMessageVisible(true);
  }
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
            {data.map(
              ({ sr_no, email, phone_number, full_name, date, message }) => (
                <>
                  <tr key={sr_no} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">{sr_no}</td>
                    <td className="table-cell">{email}</td>
                    <td className="table-cell"> {full_name}</td>
                    <td className="table-cell"> {phone_number}</td>
                    <td className="table-cell">{date}</td>
                    <td className="table-cell">
                      <button
                        onClick={showMessage}
                        data-message={message}
                        className="bg-black text-white px-6 py-2 rounded-full"
                      >
                        View Message
                      </button>
                    </td>
                  </tr>
                </>
              )
            )}
          </tbody>
        </table>
        <MesssageModal
          message={message}
          isOpen={isMessageVisible}
          openModal={showMessage}
          closeModal={hideMessage}
        />
      </div>
    </>
  );
}
