import { useState, useEffect } from "react";
import ContactUsTable from "@/components/ContactUsTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import messages from "../../json/messages.json";
import pricings from "../../json/pricings.json";
import AppPricingTable from "@/components/AppPricingTable";
import LiveChatFormTable from "@/components/LiveChatFormTable";
import { getContacts } from "@/redux/features/features.actions";
import { useRouter } from "next/router";

const tabs = ["Contact us Form", "App Pricing Form", "Live Chat Form"];
export default function Notifications() {
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
              <ContactUsTable />
            </Tab.Panel>
            <Tab.Panel>
              <AppPricingTable />
            </Tab.Panel>
            <Tab.Panel>
              <LiveChatFormTable />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
}
