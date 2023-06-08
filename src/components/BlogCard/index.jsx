import Image from "next/image";

export default function BlogCard() {
  return (
    <div className="relative">
      <div className="shadow-[0px_0px_10px_10px_#00000011] rounded-lg p-6">
        <Image
          src={"/desktop/blog_1.png"}
          width={500}
          height={500}
          className="h-40 w-40 mx-auto"
          alt="Blog Image"
        />
        <h1 className="text-center text-xl font-bold my-4">
          Read all about our interview with Private Internet Access
        </h1>
        <p className="text-center">
          {` Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s`}
        </p>
      </div>
      <div className=" mx-auto w-56 flex justify-between mt-4">
        <button className="text-white inline-block bg-[#00AD45] font-medium px-6 py-2 rounded-full">
          Edit
        </button>
        <button className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full">
          Delete
        </button>
      </div>
    </div>
  );
}
