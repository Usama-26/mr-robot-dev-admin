import ContactUsTable from "@/components/ContactUsTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";

import PricingTable from "@/components/PricingTable";
const tabs = ["Services", "Devices", "Functionalities"];
const service = [
  {
    sr_no: 1,
    title: "MVP",
    desc: "Service Description",
    price: 2500,
    icon: "mvp",
  },
];
const functionality = [
  {
    sr_no: 1,
    title: "AI/ML",
    desc: "Functionality Desc",
    price: 500,
    icon: "ai",
  },
];
const device = [
  {
    sr_no: 1,
    title: "Camera",
    desc: "Device Desc",
    price: 1000,
    icon: "camera",
  },
];
export default function Pricing() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4 relative">
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
              <PricingTable
                headers={["S No.", "Service", "Price", "Action"]}
                data={service}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PricingTable
                headers={["S No.", "Device", "Price", "Action"]}
                data={device}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PricingTable
                headers={["S No.", "Functionality", "Price", "Action"]}
                data={functionality}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
