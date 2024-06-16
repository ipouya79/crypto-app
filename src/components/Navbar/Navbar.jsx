import "./Navbar.css";
import logo from "../../assets/Images/logo.png";
import arrow_icon from "../../assets/Images/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;

      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <ul>
        <Link to="/">
          <li>خانه </li>
        </Link>
        <li>امکانات</li>
        <li>قیمت لحظه‌ای</li>
        <li>بلاگ</li>
      </ul>

      <div className="nav-right">
        <button>
         ورود / ثبت نام <img src={arrow_icon} alt="" />
        </button>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
