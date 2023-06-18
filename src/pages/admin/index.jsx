import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";

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
            />
            <h2 className="font-bold text-2xl">Total Users Visited</h2>
          </div>
          <h1 className="font-bold text-6xl">200</h1>
        </div>
        <div className="basis-1/3 rounded-xl bg-[#D32A3D] text-white text-center py-8 shadow-custom">
          <div className="flex justify-center gap-2">
            <Image
              src={"/desktop/people.svg"}
              height={32}
              width={32}
              alt="Icon"
            />
            <h2 className="font-bold text-2xl">Total Subscribed Users</h2>
          </div>
          <h1 className="font-bold text-6xl">50</h1>
        </div>
        <div className="basis-1/3 rounded-xl bg-[#D32A3D] text-white text-center py-8 shadow-custom">
          <div className="flex justify-center gap-2">
            <Image
              src={"/desktop/stats.svg"}
              height={32}
              width={32}
              alt="Icon"
            />
            <h2 className="font-bold text-2xl">Total Submitted Forms</h2>
          </div>
          <h1 className="font-bold text-6xl">300</h1>
        </div>
      </div>
    </div>
  );
}
