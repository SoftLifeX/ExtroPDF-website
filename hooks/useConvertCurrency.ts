import axios from "axios";

const useConvertCurrency = async (
  amountUSD: number,
  targetCurrency: string
) => {
  try {
    const res = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const rate = res.data.rates[targetCurrency] || 1;
    return Math.round(amountUSD * rate * 100);
  } catch (error) {
    return Math.round(amountUSD * 100);
  }
};

export default useConvertCurrency;
