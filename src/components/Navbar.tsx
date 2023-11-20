import logoBurger from "../assets/logo-burger-queen.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();
  return (
    <nav className="nav-burger">
      <ul>
        <li>
          <img src={logoBurger} alt="logo burger" />
          <a onClick={() => navigate("/")}>
            {" "}
            <p>BURGER QUEEN</p>
          </a>
        </li>
        <li className="menu-nav">
          <ul>
            <li>
              <a className="active" onClick={() => navigate("/ingresar-pedido")}>
                Ingresar pedido{" "}
              </a>
              <a href="#">Ver pedidos </a>
              <a href="#">Pedidos listos</a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Cerrar sesión<i className="fa-solid fa-right-from-bracket"></i>
              </a>
            </li>
            <li className="iconoMenu">
              <i className="fa-solid fa-bars"></i>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
