import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function AppLayout({ children }) {
  return (
    <div>
      <SideNav />
      <div className="main-margin">
        <Header />
        {children}
      </div>
    </div>
  );
}
