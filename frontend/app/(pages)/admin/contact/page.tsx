import ContactSubmissionsPage from "@/app/components/admin/contact";
import { fetchSubmissions } from "@/app/lib/fetch/admin/fetchSubmissions";
import React from "react";

type Props = {};

const AdminContact = async (props: Props) => {
  const submissions = await fetchSubmissions();

  return <ContactSubmissionsPage submissions={submissions} />;
};

export default AdminContact;
