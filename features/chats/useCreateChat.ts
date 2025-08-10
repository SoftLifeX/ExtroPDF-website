import { Message } from "@/app/(pages)/pdf/[id]/page";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createChatApi = async (payload: Message) => {
  const response = await axios.post("/api/chats", payload);
  return response.data;
};

const useCreateChat = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (payload: Message) => createChatApi(payload),
    onError: () =>
      toast({
        variant: "destructive",
        title: "Server Error",
        description: "please try again",
      }),
  });

  return {
    createChat: mutate,
    createChatPending: isPending,
    createChatError: isError,
  };
};

export default useCreateChat;
