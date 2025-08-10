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
import useLogin from "@/features/auth/useLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { OAuthLogin, OAuthLoginPending } = useOAuth();
  const { login, loginPending } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formData, {
      onSuccess: () => {
        setFormData({ email: "", password: "" });
        router.push("/")
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Extro@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgetpassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                disabled={loginPending || OAuthLoginPending}
                className="w-full"
              >
                {loginPending ? <Spinner /> : "Login"}
              </Button>
            </div>
          </form>
          <Button
            onClick={() => OAuthLogin("google")}
            disabled={loginPending || OAuthLoginPending}
            variant="outline"
            className="w-full mt-4"
          >
            {OAuthLoginPending ? <Spinner /> : "Continue with Google"}
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
