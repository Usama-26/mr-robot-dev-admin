import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link
        href={"/auth/login"}
        className="rounded-full py-2 font-medium px-4 text-center inline-block m-4 bg-red-500 hover:bg-red-600"
      >
        Go to Login
      </Link>
    </div>
  );
}
