export default function AuthLayout({ children }) {
  return (
    <div className=" h-screen w-screen flex justify-center bg-gradient-to-b from-[#FF001D] to-[#D51E33] overflow-auto">
      {children}
    </div>
  );
}
