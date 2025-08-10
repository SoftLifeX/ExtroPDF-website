import axios from "axios";

const useGetUserCountry = async () => {
  try {
    const res = await axios.get("http://ip-api.com/json/");
    return res.data.countryCode;
  } catch (error) {
    return "US";
  }
};

export default useGetUserCountry;
