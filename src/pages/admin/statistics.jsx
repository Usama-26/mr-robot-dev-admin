import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
const tabs = ["Total Visitors", "Submitted Forms", "Active Visitors"];
export default function Statistics() {
  return (
    <>
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
                    Subscribed Users
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">Total:</h1>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {["S.No", "IP Address", "Country", "Date"].map(
                          (header) => (
                            <th key={header} className="table-header">
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-cell">1</td>
                        <td className="table-cell">464t8er3rjiwoefq</td>
                        <td className="table-cell">Australia</td>
                        <td className="table-cell">2/12/2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Submitted Forms
                  </h1>
                  <h1 className="font-bold text-2xl text-black mb-4">Total:</h1>
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
                      <tr>
                        <td className="table-cell">1</td>
                        <td className="table-cell">Loremipsum@gmail.com</td>
                        <td className="table-cell">John Smith</td>
                        <td className="table-cell">2/12/2023</td>
                        <td className="table-cell">4522312342312</td>
                        <td className="table-cell">App pricing</td>
                        <td className="table-cell">
                          <span className="text-green-500 font-medium">
                            Submitted
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Subscribed Users
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
    </>
  );
}
