import React from "react";
import { ContactContent } from "./content";
import { fetchContactInfo } from "@/app/lib/fetch/admin/fetchContactInfo";

const Content = async () => {
  const contactInfo = await fetchContactInfo();

  return <ContactContent contactInfoData={contactInfo} />;
};

export default Content;
