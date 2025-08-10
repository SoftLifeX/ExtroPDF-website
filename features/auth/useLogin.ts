import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const loginApi = async (email: string, password: string) => {
  const response = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  if (!response || !response.ok) {
    throw new Error(response?.error || "Login failed");
  }
  return response;
};

const useLogin = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => loginApi(email, password),

    onSuccess: () => {
      toast({ title: "User login successful" });
    },
    onError: (err: any) => {
      const errorMessage = err?.message || "Server error, try again later";
      toast({ variant: "destructive", title: errorMessage });
    },
  });

  return {
    login: mutate,
    loginPending: isPending,
    loginError: isError,
  };
};

export default useLogin;
