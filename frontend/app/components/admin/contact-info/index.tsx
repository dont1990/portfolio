import ContactEditor from "@/app/components/admin/contact-info/content";
import { fetchContactInfo } from "@/app/lib/fetch/admin/fetchContactInfo";
import React from "react";

const AdminContactEditor = async () => {
  const contactInfo = await fetchContactInfo();

  return <ContactEditor contactInfoData={contactInfo} />;
};

export default AdminContactEditor;
