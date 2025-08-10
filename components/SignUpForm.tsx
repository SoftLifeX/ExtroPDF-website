"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useOAuth from "@/features/auth/useAuthLogin";
import Spinner from "./Spinner";
import useRegister from "@/features/auth/useRegister";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { OAuthLogin, OAuthLoginPending } = useOAuth();
  const { Register, RegisterPending } = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Register(formData, {
      onSuccess: () => {
        setFormData({ name: "", email: "", password: "" });
        router.push("/sign-in");
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your username, email, and password below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">User Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Username"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={RegisterPending || OAuthLoginPending}
              >
                {RegisterPending ? <Spinner /> : "Create Account"}
              </Button>
            </div>
          </form>
          <Button
            onClick={() => OAuthLogin("google")}
            disabled={RegisterPending || OAuthLoginPending}
            variant="outline"
            className="w-full mt-4"
          >
            {OAuthLoginPending ? <Spinner /> : "Continue with Google"}
          </Button>
          <div className="mt-4 text-center text-sm space-y-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
