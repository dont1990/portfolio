import React from "react";
import { Navigation } from "@/app/components/navigation";
import Footer from "@/app/components/footer";

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
