import { Bot } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t px-6">
      <div className="container py-6">
        <div className="flex md:flex-row flex-col justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <Link href={"/"} className="font-medium">
              ExtroPDF
            </Link>
            |
            <Link href={"/privacy-policy"}>
              <p className="text-sm text-muted-foreground">Privacy-policy</p>
            </Link>
            <Link href={"/terms-services"}>
              <p className="text-sm text-muted-foreground">TermsOfService</p>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} | Daniel C. Daniel - SoftLifeX | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
