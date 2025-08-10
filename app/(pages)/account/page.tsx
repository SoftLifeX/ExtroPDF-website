import AccountPage from "@/components/account/Account";
import { Metadata } from "next";
import { PORT } from "../layout";

export const metadata: Metadata = {
  title: "Account - ExtroPDF",
  description: "Manage your account and subscription settings in ExroPDF.",
  alternates: {
    canonical: `${PORT}/account`,
  },
};

// solve teh metadata isssue on account page ,,,,and in home page more thing , like features, testimonial

const page = () => {
  return <AccountPage />;
};

export default page;
