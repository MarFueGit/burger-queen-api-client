import logoBurger from "../assets/logo-burger-queen.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();
  return (
    <nav className="navbar-menu">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa-solid fa-bars"></i>
      </label>
      <a className="enlace" onClick={() => navigate("/")}>
        <img src={logoBurger} className="logo-nav" alt="logoBurger" />
      </a>
      <ul>
        <li>
          <a className="active" onClick={() => navigate("/ingresar-pedido")}>
            Ingresar pedido
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/ver-pedidos")}>ver pedidos</a>
        </li>
        <li>
          <a onClick={() => navigate("/pedidos-listos")}>pedidos listos</a>
        </li>
        <li>
          <a onClick={() => navigate("/historial-pedidos")}>Historial de pedidos</a>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Cerrar sesión<i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
