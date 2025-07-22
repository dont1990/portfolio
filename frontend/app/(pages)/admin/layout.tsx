import React from "react";
import { AdminNavigation } from "@/app/components/admin/navigation";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <AdminNavigation />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
