import { useNavigate } from "react-router-dom";
import LogoBurguer from "../assets/logo-burger-queen.png";

export default function Navbar() {
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();
  return (
    <nav>
      <a href="#">
        <img className="logo-nav"src={LogoBurguer} alt="logo-burger"/>
        BURGER QUEEN
      </a>
      <a className="activity" href="#" id="active">
        Ingresar pedido
      </a>
      <a
        className="activity-1"
        href="#"
        id="active"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        {" "}
        Cerrar sesión <i className="fa-solid fa-right-from-bracket"></i>
      </a>
    </nav>
  );
}
