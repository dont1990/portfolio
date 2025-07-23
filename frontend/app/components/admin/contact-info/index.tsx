import ContactInfoContent from "@/app/components/admin/contact-info/form";
import { fetchContactInfo } from "@/app/lib/fetch/admin/fetchContactInfo";
import React from "react";

const AdminContactInfo = async () => {
  const contactInfo = await fetchContactInfo();

  return <ContactInfoContent contactInfoData={contactInfo} />;
};

export default AdminContactInfo;
