import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const registerApi = async (payload: RegisterPayload) => {
  const result = await axios.post("/api/auth/register", payload);
  return result.data;
};

const useRegister = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (paylaod: RegisterPayload) => registerApi(paylaod),
    onSuccess: () => toast({ title: "User Register succesfull" }),
    onError: (err: any) => {
      const error =
        err?.response.data.message || "server Error, try again later";

      toast({ variant: "destructive", title: error });
    },
  });

  return {
    Register: mutate,
    RegisterPending: isPending,
    RegisterError: isError,
  };
};

export default useRegister;