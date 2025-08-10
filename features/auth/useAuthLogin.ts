import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const handleOAuth = async (provider: string) => {
  const result = await signIn(provider);
  if (result?.error) throw new Error(result.error);
  return result;
};

const useOAuth = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (provider: string) => handleOAuth(provider),
    onSuccess: () => toast({ title: "User Login succesfull" }),
    onError: () =>
      toast({ variant: "destructive", title: "Error while logging" }),
  });

  return {
    OAuthLogin: mutate,
    OAuthLoginPending: isPending,
    OAuthLoginError: isError,
  };
};

export default useOAuth;
