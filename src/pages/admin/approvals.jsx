import ApprovalsTable from "@/components/ApprovalsTable";
import ApprovedTable from "@/components/ApprovedTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
const tabs = ["Staff", "Clients ", "Approved Staff", "Approved Clients"];
const staff = [
  {
    sr_no: 1,
    first_name: "John Doe",
    sur_name: "John Smith",
    email: "johndoe@example.com",
    phone: "+4522312342312",
    country: "Australia",
    date: "02/12/2022",
  },
];
const client = [
  {
    sr_no: 1,
    first_name: "Jane Doe",
    sur_name: "Jane Smith",
    email: "jane@example.com",
    phone: "+11234213489214",
    country: "United States",
    date: "04/06/2022",
  },
];

const approved_staff = [
  {
    sr_no: 1,
    first_name: "John Doe",
    sur_name: "John Smith",
    email: "johndoe@example.com",
    phone: "+4522312342312",
    country: "Australia",
    date: "02/12/2022",
    signedup_by: "Admin",
    status: "Approved",
  },
];
const approved_client = [
  {
    sr_no: 1,
    first_name: "Jane Doe",
    sur_name: "Jane Smith",
    email: "jane@example.com",
    phone: "+11234213489214",
    country: "United States",
    date: "04/06/2022",
    status: "Approved",
  },
];
export default function SignupApprovals() {
  return (
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
            <ApprovalsTable
              headers={[
                "S No.",
                "First Name",
                "Sur Name",
                "Email",
                "Phone",
                "Country",
                "Date",
                "Actions",
              ]}
              data={staff}
              heading={"Staff Details"}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ApprovalsTable
              headers={[
                "S No.",
                "First Name",
                "Sur Name",
                "Email",
                "Phone",
                "Country",
                "Date",
                "Actions",
              ]}
              data={client}
              heading={"Client Details"}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ApprovedTable
              headers={[
                "S No.",
                "First Name",
                "Sur Name",
                "Email",
                "Phone",
                "Country",
                "Action",
                "Date",
                "Signedup By",
                "Approved",
              ]}
              data={approved_staff}
              heading={"Approved Staff"}
            />
          </Tab.Panel>
          <Tab.Panel>
            {" "}
            <ApprovedTable
              headers={[
                "S No.",
                "First Name",
                "Sur Name",
                "Email",
                "Phone",
                "Country",
                "Action",
                "Date",
                "Signedup By",
                "Approved",
              ]}
              data={approved_client}
              heading={"Approved Client"}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
