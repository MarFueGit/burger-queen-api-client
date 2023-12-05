import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  // usamos el hook useNavigate para navegar a login
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="section-welcome">
        <h1>
          BIENVENIDO<i className="fa-solid fa-mug-hot"></i>
        </h1>
      </section>
    </>
  );
}
