import logoBurger from "../assets/logo-burger-queen.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();
  return (
    <nav className="nav-burger">
      <ul>
        <li>
          <img src={logoBurger} alt="logo burger" />
          <p>BURGER QUEEN</p>
        </li>
        <li className="menu-nav">
          <ul>
            <li>
              <a href="#">Ingresar pedido </a>
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
