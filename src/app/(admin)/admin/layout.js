import SessionWrapper from "@/components/authProvider";
import { NavBarAdmin } from "@/conponents/admin/navBar";

export default function AdminLayout({ children }) {
  return (
    <SessionWrapper>
      <div className="p-4 flex flex-col gap-6 max-w-7xl mx-auto">
        <NavBarAdmin />
        {children}
      </div>
    </SessionWrapper>
  );
}
