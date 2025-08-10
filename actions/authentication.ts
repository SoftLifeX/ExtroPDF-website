"use server";

import { PrePaymentRules } from "@/lib/arcjet";
import { authOptions } from "@/lib/auth";
import { request } from "@arcjet/next";
import { getServerSession } from "next-auth";

export const VerifyMail = async (email: string) => {
  try {
    if (!email)
      return { success: false, message: "Please enter a valid email address." };

    const session = await getServerSession(authOptions);
    if (!session)
      return {
        success: false,
        message: "You must be logged in to verify an email.",
      };

    if (session.user.email !== email)
      return {
        success: false,
        message: "The email does not match the logged-in user.",
      };

    const req = await request();
    const decision = await PrePaymentRules.protect(req, { email });

    if (decision.isDenied()) {
      if (decision.reason.isEmail()) {
        const emailTypes = decision.reason.emailTypes;

        if (emailTypes.includes("DISPOSABLE")) {
          return {
            success: false,
            message: "Disposable email addresses are not allowed.",
          };
        }
        if (emailTypes.includes("INVALID")) {
          return {
            success: false,
            message: "Invalid email address. Please check and try again.",
          };
        }
        if (emailTypes.includes("NO_MX_RECORDS")) {
          return {
            success: false,
            message: "This email domain does not have valid MX records.",
          };
        }
        return {
          success: false,
          message: "This email address cannot be verified. Please try another.",
        };
      }

      if (decision.reason.isBot()) {
        return {
          success: false,
          message: "Verification failed due to bot-like activity.",
        };
      }
      if (decision.reason.isShield()) {
        return {
          success: false,
          message: "Suspicious activity detected. Verification blocked.",
        };
      }
      if (decision.reason.isRateLimit()) {
        return {
          success: false,
          message: "Too many attempts. Please wait and try again later.",
        };
      }
    }

    return { success: true, message: "Email verified successfully!" };
  } catch (error) {
    return {
      success: false,
      message: "A server error occurred. Please try again later.",
    };
  }
};
