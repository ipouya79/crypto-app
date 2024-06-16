import { useParams } from "react-router-dom";
import "./Coin.css";
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart.jsx/LineChart";
import axios from "axios";
import toast from "react-hot-toast";
const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const fetchCoinData = async () => {
    const options = {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": "CG-x1HMDDcd4g7QDa4TRy7mPGwX",
      },
    };

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      setCoinData(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      headers: {
        Accept: "application/json",
        "x-cg-demo-api-key": "CG-x1HMDDcd4g7QDa4TRy7mPGwX",
      },
    };

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      setHistoricalData(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="coin img" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>

        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>رتبه ارز</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>قیمت فعلی</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>

          <ul>
            <li>ارزش بازار</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>بالاترین قیمت(24 ساعت)</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>پایین ترین قیمت(24 ساعت)</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
