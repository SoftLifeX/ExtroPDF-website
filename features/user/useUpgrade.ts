import { toast } from "@/hooks/use-toast";
import { Transaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const upgradeApi = async (payload: Partial<Transaction>) => {
  const result = await axios.put("/api/transaction", payload);
  return result.data;
};

const useUpgrade = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (payload: Partial<Transaction>) => upgradeApi(payload),

    onSuccess: () => {
      toast({ title: "Account upgarded successfully" });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () =>
      toast({ title: "failed to upgrade account", variant: "destructive" }),
  });

  return {
    upgrade: mutate,
    upgradePending: isPending,
    upgradeError: isError,
  };
};

export default useUpgrade;
