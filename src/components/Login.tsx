import React, { useState } from "react";
import LogoBurguer from "../assets/logo-burger-queen.png";
import { Token } from "../types/types";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();

  return (
    <main className="main-container">
      <section className="section-login">
        <img className="logo-burger" src={LogoBurguer} alt="logo burguer" />
        <h1>WELCOME TO BURGER QUEEN</h1>
        <form action="">
          <label htmlFor="">Email</label>
          <input
            type="email" name="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="">Password </label>
          <input
            type="password" name="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            onClick={async (event) => {
              event.preventDefault();
              const response: Token = await login(email, password);
              console.log("response:", response);
              localStorage.setItem("token", response.accessToken);
              navigate("/");
            }}
          >
            Sign In
          </button>
          <p className="need-account">
            Need an Account? <br />
            <a href="#"></a>Sign In
          </p>
        </form>
      </section>
    </main>
  );
}
