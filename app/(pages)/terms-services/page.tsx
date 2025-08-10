import { LinkPreview } from "@/components/ui/link-preview";
import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">Last updated: April 13, 2025</p>

      <p className="mb-4">
        By accessing or using IntellicPDF, you agree to the following terms and
        conditions. If you do not agree with them, please do not use the
        service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Service</h2>
      <p className="mb-4">
        ExtroPDF allows users to upload PDFs and receive AI-generated
        responses. You agree to use this service only for lawful and appropriate
        purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Prohibited Conduct</h2>
      <p className="mb-4">
        You may not upload or share any content that is illegal, harmful,
        abusive, or violates any law or regulation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Accounts and Access</h2>
      <p className="mb-4">
        Access to ExtroPDF requires a Google account. You must be 13 years of
        age or older to use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Plans and Pricing</h2>
      <p className="mb-4">
        ExtroPDF offers a free tier and may also offer paid plans with
        additional features.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Modifications and Termination
      </h2>
      <p className="mb-4">
        We may modify or discontinue the service at any time, with or without
        notice.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Note on Project Status
      </h2>
      <p className="mb-4">
        ExtroPDF is currently a personal portfolio project created for
        educational and demonstration purposes. While the service is functional,
        it may not yet meet enterprise-grade standards. In the future, we may
        evolve this project into a full SaaS business with improved features,
        security, and user controls.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        If you have questions about these terms, contact developer:{" "}
        <LinkPreview url="https://softlifex.vercel.app" className="font-bold">
          softlifex.vercel.app
        </LinkPreview>
      </p>
    </div>
  );
};

export default TermsOfService;
