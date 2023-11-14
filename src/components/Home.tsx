import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
// import imgCoffe from "../assets/coffe-american.png";
import imgCoffeMilk from "../assets/coffe-milk.jpg";
import imgSandwich from "../assets/sandwiche.jpg";
import imgJugoFruta from "../assets/jugos-frutas.png";

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
      <section className="section-home">
        <div className="button-home">
          <button className="button-breack">Desayuno ☕🥪🥃</button>
          <button className="button-comida">Comida 🍔🍟🍗</button>
        </div>
        <div className="list-menu">
          <div className="breackfa">
            <img
              className="image-coffe"
              src={"https://img.icons8.com/color/96/cafe--v1.png"}
              alt="imagen cafe"
            />
            <p>
              {" "}
              Cafe Americano <br />
              $7.00{" "}
            </p>
            <button className="button-agregar">Agregar</button>
          </div>
          <div className="breackfa">
            <img className="image-coffe" src={"https://img.icons8.com/color/96/cafe--v1.png"} alt="imagen cafe" />
            <p>
              {" "}
              Cafe con leche <br />
              $7.00{" "}
            </p>
            <button className="button-agregar">Agregar</button>
          </div>
          <div className="breackfa">
            <img className="image-coffe" src={"https://img.icons8.com/color/96/cafe--v1.png"} alt="imagen cafe" />
            <p>
              Sandwich de jamón y queso
              <br />
              $7.00{" "}
            </p>
            <button className="button-agregar">Agregar</button>
          </div>
          <div className="breackfa">
            <img className="image-coffe" src={"https://img.icons8.com/color/96/cafe--v1.png"} alt="imagen cafe" />
            <p>
              Jugo de frutas natural
              <br />
              $7.00{" "}
            </p>
            <button className="button-agregar">Agregar</button>
          </div>
        </div>

        <div className="item-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cafe americano</td>
                <td>$5.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Sandwich de jamón y queso</td>
                <td>$10.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Jugo natural</td>
                <td>$7.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$22.00</td>
              </tr>
              <tr>
               <td><button className="button-table">Enviar a cocina</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
