import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import dynamic from "next/dynamic";
import { withAuth } from "@/components/Helpers/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getNewsLetter,
  getStats,
  getContacts,
} from "@/redux/features/features.actions";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Admin = () => {
  const newsLetterData = useSelector(({ features }) => features.newsLetter);
  const statsData = useSelector(({ features }) => features.stats);
  const contactsData = useSelector(({ features }) => features.contacts);
  const dispatch = useDispatch();
  const [monthCounts, setMonthCounts] = useState({});
  useEffect(() => {
    dispatch(getNewsLetter("subscribed", 1));
    dispatch(getStats(1));
    dispatch(getContacts("ALL", 1));
  }, []);

  return (
    <AppLayout>
      <div className="p-4 max-w-screen-2xl mx-auto ">
        <div className="flex gap-4">
          <div className="basis-1/3 rounded-xl bg-[#D32A3D] text-white text-center py-8 shadow-custom">
            <div className="flex justify-center gap-2">
              <Image
                src={"/desktop/visited.svg"}
                height={32}
                width={32}
                alt="Icon"
                className="w-8 h-8"
              />
              <h2 className="font-bold text-xl">Total Users Visited</h2>
            </div>
            <h1 className="font-bold text-5xl">{statsData?.totalResults}</h1>
          </div>
          <div className="basis-1/3 rounded-xl bg-[#D32A3D] text-white text-center py-8 shadow-custom">
            <div className="flex justify-center gap-2">
              <Image
                src={"/desktop/people.svg"}
                height={32}
                width={32}
                alt="Icon"
                className="w-8 h-8"
              />
              <h2 className="font-bold text-xl">Total Subscribed Users</h2>
            </div>
            <h1 className="font-bold text-5xl">
              {newsLetterData?.totalResults}
            </h1>
          </div>
          <div className="basis-1/3 rounded-xl bg-[#D32A3D] text-white text-center py-8 shadow-custom">
            <div className="flex justify-center gap-2">
              <Image
                src={"/desktop/stats.svg"}
                height={32}
                width={32}
                alt="Icon"
                className="w-8 h-8"
              />
              <h2 className="font-bold text-xl">Total Submitted Forms</h2>
            </div>
            <h1 className="font-bold text-5xl">{contactsData?.totalResults}</h1>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="basis-1/2 my-4 bg-gray-200 rounded-lg p-2">
            <Chart
              series={[
                {
                  name: "Visited Users",
                  data: [
                    50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                  ],
                },
              ]}
              type="area"
              options={{
                title: {
                  text: "Total Visited Users",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                },
                chart: {
                  id: "users-visited",
                  background: "#e5e7eb",
                  toolbar: {
                    show: false,
                  },
                },
                colors: ["#D32A3D"],
                plotOptions: {
                  bar: { columnWidth: "50%" },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
          <div className="basis-1/2 my-4 bg-gray-200 rounded-lg p-2">
            <Chart
              series={[
                {
                  name: "Subscribed Users",
                  data: [
                    50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                  ],
                },
              ]}
              type="bar"
              options={{
                title: {
                  text: "Total Subscribed Users",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },
                },
                chart: {
                  id: "subscribed-users",
                  background: "#e5e7eb",
                  toolbar: {
                    show: false,
                  },
                },
                colors: ["#D32A3D"],
                plotOptions: {
                  bar: { columnWidth: "50%" },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
        </div>
        <div className="my-4 p-4 bg-gray-200 rounded-lg">
          <Chart
            series={[
              {
                name: "Submitted Forms",
                data: [
                  50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                ],
              },
            ]}
            height={400}
            type="line"
            options={{
              title: {
                text: "Total Submitted Forms",
                style: {
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              },
              stroke: {
                curve: "smooth",
              },
              chart: {
                id: "submitted-forms",
                background: "#e5e7eb",
                dropShadow: {
                  enabled: true,
                  color: "#000",
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2,
                },
                toolbar: {
                  show: true,
                },
              },
              colors: ["#D32A3D"],
              plotOptions: {
                bar: { columnWidth: "50%" },
              },
              dataLabels: {
                enabled: true,
                background: {
                  enabled: true,
                  borderRadius: 5,
                  borderWidth: 0,
                  padding: 5,
                },
              },
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};
export default withAuth(Admin);
