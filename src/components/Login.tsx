import { useState } from "react";
import LogoBurguer from "../assets/logo-burger-queen.png";
import { Token } from "../types/types";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false); // nos dice si hay error o no
  const [errorMessage, setErrorMessage] = useState<string>(""); // guarda el mensaje de error
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();

  return (
    <main className="main-container">
      {error ? (
        <div className="container-toast">
          <div className="toast error">
            <div className="container-1">
              <i className="fas fa-times-circle"></i>
            </div>
            <div className="container-2">
              <p>Error</p>
              <p data-testid={"messageToast"}>{errorMessage}</p>
            </div>
            <button data-testid={"buttonToast"}
              onClick={() => {
                setError(false);
                setErrorMessage("");
              }}
            >
              &times;
            </button>
          </div>
        </div>
      ) : null}
      <section className="section-login">
        <img className="logo-burger" src={LogoBurguer} alt="logo burguer" />
        <h1>BIENVENIDO A BURGER QUEEN</h1>
        <form action="">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            data-testid={"inputEmail"}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />

          <label htmlFor="">Contraseña </label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            data-testid={"inputPassword"}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <button
            className="boton-sign"   data-testid={"buttonLogin"}
            onClick={async (event) => {
              event.preventDefault();
              const response: Token = await login(email, password);
              console.log("response:", response);
              if (response.accessToken) {
                // Si la respuesta es correcta me manda a home
                localStorage.setItem("token", response.accessToken);
                navigate("/");
              } else {
                //Si no es correcta mostramos el mensaje de error
                setError(true);
                setErrorMessage(String(response));
                setEmail(""); // Receteamos los inputs
                setPassword("");
              }
            }}
          >
            Iniciar sesión
          </button>
          {/* <p className="need-account">
            Need an Account? <br />
            <a href="#"></a>Sign In
          </p> */}
        </form>
      </section>
    </main>
  );
}
