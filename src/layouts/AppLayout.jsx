import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function AppLayout({ children }) {
  return (
    <div>
      <Header />
      <SideNav />
      {children}
    </div>
  );
}
