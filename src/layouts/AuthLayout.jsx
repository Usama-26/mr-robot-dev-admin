export default function AuthLayout({ children }) {
  return (
    <div className=" h-screen w-screen flex justify-center bg-[#D32A3D] overflow-auto">
      {children}
    </div>
  );
}
