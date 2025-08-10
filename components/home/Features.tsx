import React from "react";
import { Card } from "../ui/card";
import {
  Shield,
  CreditCard,
  Lock,
  MousePointerClick,
  Brain,
  Clock,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your documents are encrypted with military-grade protection. We prioritize your data security above all.",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "All transactions are processed through trusted payment gateways with fraud protection.",
  },
  {
    id: 3,
    icon: Lock,
    title: "Privacy First",
    description:
      "Your data is yours alone. We maintain strict privacy controls and never share your information.",
  },
  {
    id: 4,
    icon: MousePointerClick,
    title: "Easy to Use",
    description:
      "Intuitive interface designed for simplicity. Start chatting with your documents in seconds.",
  },
  {
    id: 5,
    icon: Brain,
    title: "Advanced AI",
    description:
      "Powered by state-of-the-art language models for accurate and contextual responses.",
  },
  {
    id: 6,
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access your documents and get answers anytime, anywhere. No waiting required.",
  },
];

const Features = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
        Powerful Features
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ id, icon: Icon, title, description }) => (
          <Card key={id} className="p-6 group hover:shadow-md transition-all">
            <Icon className="h-10 w-10 mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
