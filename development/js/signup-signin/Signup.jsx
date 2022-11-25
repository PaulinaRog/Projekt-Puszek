import { useState, useRef } from "react";
import React from "react";
import supabase from "../contexts/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";

function Signin() {
  const [text, setText] = useState("");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

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
        localStorage.setItem("userData", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.error_description);
      console.log(error.message);
    }
  };

  return (
    <>
      <form className="signin-form">
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
          ref={email}
        ></input>
        <label className="sign-form-label">Hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={password}
          required
        ></input>
        <button
          className="sign-form-button"
          onClick={handleLogin}
          type="submit"
        >
          ZALOGUJ
        </button>
        <p>{text}</p>
        <p>Zapomniałeś hasła?</p>
        <a href="">Kliknij tutaj</a>
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

  const handleSignUp = async (e) => {
    e.preventDefault();

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
          navigate("dashboard/profile/edit");
        }
      } catch (error) {
        console.log(error.error_description);
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <form className="signup-form">
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
          onClick={handleSignUp}
        >
          ZAREJESTRUJ
        </button>
        <p>{text}</p>
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
        style={{ width: loginFormVisible ? "300px" : "100px" }}
      >
        <div
          onClick={handleClick}
          style={{ display: loginFormVisible ? "none" : "block" }}
        >
          <i className="fa-solid fa-user-check"></i>
          <span style={{ marginLeft: "-15px" }}>LOGOWANIE</span>
        </div>
        {loginFormVisible ? <Signin /> : null}
      </section>
      <section
        className="signup"
        style={{ width: loginFormVisible ? "100px" : "300px" }}
      >
        <div
          onClick={handleClick}
          style={{ display: loginFormVisible ? "block" : "none" }}
        >
          <i className="fa-solid fa-user-plus"></i>
          <span style={{ marginLeft: "-17px" }}>REJESTRACJA</span>
        </div>
        {loginFormVisible ? null : <Signup />}
      </section>
      <NavLink to="/">
        <p>WRÓĆ DO STRONY GŁÓWNEJ</p>
      </NavLink>
      <NavLink to="/dashboard">DASHBOARD</NavLink>
    </div>
  );
}
