import SessionWrapper from "@/components/authProvider";
import { NavBarAdmin } from "@/conponents/admin/navBar";

export default function AdminLayout({ children }) {
  return (
    <SessionWrapper>
      <div className="admin-shell">
        <div className="site-container">
          <NavBarAdmin />
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </SessionWrapper>
  );
}
