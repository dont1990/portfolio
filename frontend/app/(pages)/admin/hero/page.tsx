import React, { Suspense } from "react";
import AdminHeroEditor from "@/app/components/admin/hero";

const AdminHeroEditorPage = () => {
  return (
    <>
      <Suspense fallback={<div>loading ...</div>}>
        <AdminHeroEditor />
      </Suspense>
    </>
  );
};

export default AdminHeroEditorPage;
