import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserApi = async () => {
  const response = await axios.get("/api/auth/user");
  return response.data;
};

const useGetUser = () => {
  const { data, isPending, isError } = useQuery({
    queryFn: getUserApi,
    queryKey: ["user"],
  });
  return {
    user: data,
    userPending: isPending,
    userError: isError,
  };
};

export default useGetUser;
