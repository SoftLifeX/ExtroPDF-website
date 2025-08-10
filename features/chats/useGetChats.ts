import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getChatsApi = async (fileId: string) => {
  const response = await axios.get(`/api/chats?fileId=${fileId}`);
  return response.data;
};

const useGetChats = (fileId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChatsApi(fileId),
  });
  return {
    chats: data,
    chatsLoading: isLoading,
    chatsError: isError,
  };
};

export default useGetChats;
