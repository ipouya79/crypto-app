import { useState } from "react";
import cross_icon from "../../assets/Images/cross_icon.png";
import "./LoginPopUp.css";

function LoginPopUp({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("ثبت نام");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currentState === "ورود" ? (
            <></>
          ) : (
            <input type="text" placeholder="نام " required />
          )}

          <input type="email" placeholder="ایمیل" required />
          <input type="password" placeholder="گذرواژه" required />
        </div>

        <button>
          {currentState === "ثبت نام" ? "ساخت حساب کاربری" : "ورود"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>با ادامه، با شرایط استفاده و سیاست حفظ حریم خصوصی موافقم</p>
        </div>
        {currentState === "ورود" ? (
          <p>
            ایجاد یک حساب کاربری جدید؟
            <span onClick={() => setCurrentState("ثبت نام")}>کلیک کنید</span>
          </p>
        ) : (
          <p>
            در حال حاضر یک حساب کاربری دارید؟
            <span onClick={() => setCurrentState("ورود")}>وارد شوید</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
