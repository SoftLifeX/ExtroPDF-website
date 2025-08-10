"use server";

import { authOptions } from "@/lib/auth";
import { razorPay } from "@/lib/razorpay";
import { getServerSession } from "next-auth";

const createOrder = async ({
  price,
  planName,
}: {
  price: number;
  planName: string;
}) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Authentication required. Please sign in.");

  try {
    const order = await razorPay.orders.create({
      amount: price * 100,
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
      notes: {
        plan: planName,
        userId: session.user.id.toString(),
      },
    });

    return {
      order_id: order.id,
      amount: order.amount as number,
      currency: order.currency,
    };
  } catch (error) {
    throw new Error("Failed to create order. Please try again.");
  }
};

export default createOrder;
