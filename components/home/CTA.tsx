import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();
  return (
    <section className="py-16">
      <Card className="border-0 shadow-lg">
        <div className="relative flex flex-col items-center p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary to-primary/90"></div>
          <div className="relative z-10 text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 max-w-[600px] text-lg opacity-90">
              Join thousands of users who are already experiencing the power of
              AI-driven document conversations.
            </p>
            <Button
              onClick={() => router.push("/sign-up")}
              size="lg"
              variant="secondary"
              className="mt-8 h-12 px-8"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default CTA;
