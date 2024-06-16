import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          بزرگترین <br />
          بازار ارزهای دیجیتال
        </h1>
        <p>
          به بزرگترین بازار ارزهای دیجیتال خوش آمدید. برای کاوش بیشتر در مورد
          ارزهای دیجیتال، ثبت نام کنید
        </p>
        <form onSubmit={searchHandler}>
          <input
            list="coinList"
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="جستجوی ارز.."
            required
          />

          <datalist id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">جستجو</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>نام رمز ارز</p>
          <p>قیمت</p>
          <p className="text-center">تغییرات (24 ساعت) </p>
          <p className="market-cap">حجم معاملات </p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="coin img" />
              <p>{item.symbol.toUpperCase()}</p>
              {/* <p>{item.name + "" + item.symbol.toUpperCase()}</p> */}
            </div>
            <p>
              {currency.symbol}
              {item.current_price}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
