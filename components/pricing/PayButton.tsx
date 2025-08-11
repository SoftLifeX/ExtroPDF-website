"use client";

import { useSession } from "next-auth/react";
import createOrder from "@/actions/createOrder";
import { toast } from "@/hooks/use-toast";
import useUpgrade from "@/features/user/useUpgrade";
import { Plan as PlanType } from "./PricingPage";
import { Plan } from "@prisma/client";
import { Button } from "../ui/button";

interface PayButtonProps {
  plan: PlanType;
}

const PayButton = ({ plan }: PayButtonProps) => {
  const { data: session } = useSession();
  const { upgrade, upgradePending } = useUpgrade();

  // Handle payment
  const handlePayment = async () => {
    if (!session) {
      return toast({
        title: "Unauthorized",
        description: "Please sign in to proceed.",
        variant: "destructive",
      });
    }

    try {
      const { amount, order_id, currency } = await createOrder({
        price: plan.price,
        planName: plan.name,
      });

      const razorpay = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id,
        name: "IntellicPdf",
        description: `${plan.name} Plan`,
        handler: (res: any) => {
          const { razorpay_payment_id } = res;
          upgrade({
            amount,
            currency_code: currency,
            plan: plan.name as Plan,
            transactionId: razorpay_payment_id,
          });
        },
        prefill: {
          email: session.user.email,
        },
      });

      razorpay.open();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "An error occurred during payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handlePayment} disabled={upgradePending}>
      {upgradePending ? "Processing..." : "Pay"}
    </Button>
  );
};

export default PayButton;
