import { LinkPreview } from "@/components/ui/link-preview";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: April 13, 2025</p>

      <p className="mb-4">
        At ExtroPDF, your privacy is important to us. This Privacy Policy
        explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="mb-4">
        We collect your Google account email and profile image when you sign in
        using Google Authentication.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use your information solely to provide authentication and track your
        usage of our services such as uploaded PDFs and AI queries.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Storage</h2>
      <p className="mb-4">
        Uploaded PDFs are stored securely on Cloudinary and converted into
        vector format using Pinecone for AI processing. We do not use cookies,
        except session handling provided by Auth.js.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We do not sell or share your personal data with third parties, except
        where necessary for payment processing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Deletion</h2>
      <p className="mb-4">
        Currently, there is no direct option for data deletion. We plan to
        implement this feature in the future.
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
        For questions regarding this Privacy Policy, contact developer:{" "}
        <LinkPreview url="https://softlifex.vercel.app" className="font-bold">
          softlifex.vercel.app
        </LinkPreview>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
