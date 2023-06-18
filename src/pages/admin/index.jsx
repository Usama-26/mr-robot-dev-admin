import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default function Admin() {
  return (
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
          <h1 className="font-bold text-5xl">200</h1>
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
          <h1 className="font-bold text-5xl">50</h1>
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
          <h1 className="font-bold text-5xl">300</h1>
        </div>
      </div>

      <div className="flex gap-4">
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
    </div>
  );
}
