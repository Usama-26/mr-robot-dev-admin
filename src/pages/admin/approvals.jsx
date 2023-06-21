import ApprovalsTable from "@/components/ApprovalsTable";
import ApprovedTable from "@/components/ApprovedTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { withAuth } from "@/components/Helpers/withAuth";

const tabs = ["Staff", "Clients ", "Staff Status", "Client Status"];
const SignupApprovals = (props) => {
  const userData = props.userData;
  return (
    <AppLayout>
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
                heading={"Staff Details"}
                role={"staff"}
                userData={userData}
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
                heading={"Client Details"}
                role={"user"}
                userData={userData}
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
                heading={"Approved Staff"}
                role={"staff"}
                userData={userData}
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
                heading={"Approved Client"}
                role={"user"}
                userData={userData}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
};

export default withAuth(SignupApprovals);
