import React, { Suspense } from "react";
import AdminContactInfo from "../../../components/admin/contact-info";
import ContactInfoSkeleton from "@/app/components/admin/contact-info/skeleton";

const AdminContactInfoPage = () => {
  return (
    <>
      <Suspense fallback={<ContactInfoSkeleton />}>
        <AdminContactInfo />
      </Suspense>
    </>
  );
};

export default AdminContactInfoPage;
