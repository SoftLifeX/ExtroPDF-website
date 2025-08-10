"use client";

import { useState } from "react";

import { Plan } from "./PricingPage";
import { VerifyMail } from "@/actions/authentication";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../Spinner";
import PayButton from "./PayButton";

const CheckOutModal = ({
  plan,
  isOpen,
  onClose,
}: {
  plan: Plan;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const email = new FormData(event.currentTarget).get("email") as string;
    const { message, success } = await VerifyMail(email);

    setIsLoading(false);

    if (!success) {
      return toast({ variant: "destructive", title: message });
    }

    setIsVerified(true);
    toast({ title: "Email verified successfully" });
  };

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsVerified(false);
          setIsLoading(false);
          onClose(false);
        }
      }}
    >
      <DialogContent className="max-h-[30rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isVerified || isLoading}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <Button
            disabled={isVerified || isLoading}
            type="submit"
            className="w-full font-bold text-lg flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : isVerified ? "Verified" : "Verify Email"}
          </Button>
        </form>

        {isVerified && <PayButton plan={plan} />}
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutModal;
