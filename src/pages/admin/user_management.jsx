import UserManagementTable from "@/components/UserManagementTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
const tabs = ["Staff", "Clients "];
const staff = [
  {
    sr_no: 1,
    first_name: "John Doe",
    title: "Developer",
    email: "johndoe@example.com",
    phone: "+4522312342312",
    date: "02/12/2022",
    status: "active",
    signedup_by: "Admin",
  },
];

const client = [
  {
    sr_no: 1,
    full_name: "Jane Doe",
    email: "jane@example.com",
    phone: "+11234213489214",
    company: "HP Cranes",

    added_on: "04/06/2022",
    member_since: "Dec 2020",
    status: "inactive",
  },
];
export default function UserManagement() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4">
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
              <UserManagementTable
                heading={"Staff View"}
                headers={[
                  "S No.",
                  "Display Name",
                  "Email",
                  "Phone",
                  "Title",
                  "Active/Inactive",
                  "Added on",
                  "Signedup By",
                  "Action",
                ]}
                data={staff}
                member={"staff"}
              />
            </Tab.Panel>
            <Tab.Panel>
              <UserManagementTable
                heading={"Client View"}
                headers={[
                  "S No.",
                  "Full Name",
                  "Email",
                  "Phone",
                  "Company Name",
                  "Added on",
                  "Member Since",
                  "Active/Inactive",
                  "Action",
                ]}
                member={"client"}
                data={client}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
