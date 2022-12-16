import { useState, useRef } from "react";
import React from "react";
import supabase from "../contexts/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";

function Signin() {
  const [text, setText] = useState("");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email.current.value,
        password: password.current.value,
      });

      if (error) {
        setText("Logowanie nie powiodło się!");
      }
      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setText("Logowanie nie powiodło się!");
    }
  };

  return (
    <>
      <form className="signin-form" style={{ animation: "appear ease-out 2s" }}>
        <h1
          className="sign-form-title"
          style={{ color: "#ffff00", fontWeight: 600, fontSize: "1.3em" }}
        >
          ZALOGUJ SIĘ
        </h1>
        <label className="sign-form-label" type="email">
          Login
        </label>
        <input
          type="text"
          className="sign-form-input"
          required
          data-cy="input-email"
          name="login"
          ref={email}
        ></input>
        <label className="sign-form-label">Hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={password}
          name="password"
          data-cy="input-password"
          required
        ></input>
        <button
          data-cy="submit-button"
          className="sign-form-button"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          type="submit"
        >
          ZALOGUJ
        </button>
        <p className="sign-form-err">{text}</p>
        {/* <p className="sign-form-passwd">Zapomniałeś hasła?</p>
        <NavLink to="/reset" className="sign-form-passwd-link">
          Kliknij tutaj
          <i
            style={{ fontSize: 15, padding: 5 }}
            className="fa-solid fa-unlock"
          ></i>
        </NavLink> */}
      </form>
    </>
  );
}

function Signup() {
  const [text, setText] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setText("Podane hasła różnią się od siebie!");
    } else {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });

        if (error) {
          setText("Rejestracja nieudana!");
        }
        if (user) {
          navigate("/setprofile");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form className="signup-form" style={{ animation: "appear ease-out 2s" }}>
        <h1
          className="sign-form-title"
          style={{ color: "#ffff00", fontWeight: 600, fontSize: "1.3em" }}
        >
          ZAREJESTRUJ SIĘ
        </h1>
        <label className="sign-form-label">E-mail</label>
        <input
          type="email"
          className="sign-form-input"
          ref={emailRef}
          id="emailRef"
          required
        ></input>
        <label className="sign-form-label">Hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={passwordRef}
          id="passwordRef"
          required
        ></input>
        <label className="sign-form-label">Powtórz hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={passwordConfirmRef}
          id="passwordConfirmRef"
          required
        ></input>
        <button
          className="sign-form-button"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          ZAREJESTRUJ
        </button>
        <p className="sign-form-err">{text}</p>
      </form>
    </>
  );
}

export default function SigninSignup() {
  const [loginFormVisible, setLoginFormVisible] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setLoginFormVisible((prev) => !prev);
  };

  return (
    <div className="signin">
      <section
        className="sign-form"
        style={{
          width: loginFormVisible ? "300px" : "100px",
          animation: loginFormVisible
            ? "switch linear 0.4s"
            : "switch-left linear 0.4s",
        }}
      >
        <div
          onClick={handleClick}
          style={{
            display: loginFormVisible ? "none" : "block",
          }}
        >
          <div className="sign-box">
            <i className="fa-solid fa-user-check"></i>
            <span className="sign-form-choice" style={{ marginLeft: "-15px" }}>
              LOGOWANIE
            </span>
          </div>
        </div>
        {loginFormVisible ? <Signin /> : null}
      </section>
      <section
        className="signup"
        style={{
          width: loginFormVisible ? "100px" : "300px",
          animation: !loginFormVisible
            ? "switch linear 0.4s"
            : "switch-left linear 0.4s",
        }}
      >
        <div
          onClick={handleClick}
          style={{
            display: loginFormVisible ? "block" : "none",
          }}
        >
          <div className="sign-box">
            <i className="fa-solid fa-user-plus"></i>
            <span className="sign-form-choice" style={{ marginLeft: "-17px" }}>
              REJESTRACJA
            </span>
          </div>
        </div>
        {loginFormVisible ? null : <Signup />}
      </section>
      <div className="signup-navlinks">
        <NavLink to="/" className="signup-navlink">
          <button className="signup-navlink-button">
            <i style={{ fontSize: 25 }} className="fa-solid fa-angles-left"></i>
            WRÓĆ DO STRONY GŁÓWNEJ
          </button>
        </NavLink>
        <NavLink to="/dashboard" className="signup-navlink">
          <button className="signup-navlink-button">
            PANEL UŻYTKOWNIKA
            <i
              style={{ fontSize: 25, marginLeft: 20 }}
              className="fa-solid fa-angles-right"
            ></i>
          </button>
        </NavLink>
      </div>
    </div>
  );
}
