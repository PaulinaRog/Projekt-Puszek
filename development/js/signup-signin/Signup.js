import { useState, useRef } from "react";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { useAuth } from "firebase/auth";

function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <form className="signin-form">
        <h1
          className="sign-form-title"
          style={{ color: "#ffff00", fontWeight: 600, fontSize: "1.3em" }}
        >
          ZALOGUJ SIĘ
        </h1>
        <label className="sign-form-label" type="email" ref={emailRef} required>
          Login
        </label>
        <input type="text" className="sign-form-input"></input>
        <label className="sign-form-label">Hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={passwordRef}
          required
        ></input>
        <button
          className="sign-form-button"
          onClick={(e) => e.preventDefault()}
          type="submit"
        >
          ZALOGUJ
        </button>
      </form>
    </>
  );
}

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Podane hasła różnią się od siebie!");
    }

    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Nie udało się utworzyć konta");
    }
  }

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
          required
        ></input>
        <label className="sign-form-label">Hasło</label>
        <input
          type="password"
          className="sign-form-input"
          ref={passwordRef}
          required
        ></input>
        <label className="sign-form-label">Powtórz hasło</label>
        <input
          type="password-confirm"
          className="sign-form-input"
          ref={passwordConfirmRef}
          required
        ></input>
        <button
          className="sign-form-button"
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          ZAREJESTRUJ
        </button>
        <p>{error}</p>
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
    <AuthProvider>
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
      </div>
    </AuthProvider>
  );
}
