import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

  const fetchAllCoin = async () => {
    const options = {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": "CG-x1HMDDcd4g7QDa4TRy7mPGwX",
      },
    };

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      setAllCoin(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contaxtValue = { allCoin, currency, setCurrency };

  return (
    <CoinContext.Provider value={contaxtValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
