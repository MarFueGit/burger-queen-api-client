import React, {useEffect} from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
export default function Home() {
   // usamos el hook useNavigate para navegar a login
   const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token')
      if(!token){
         navigate('/login')
      } 
  }, [])
  
  return (
    <>
      <Navbar />
      <section className="section-home">
        <div className="button-home">
          <button>Desayuno</button>
          <button>Comida</button>
        </div>
        <div className="breackfa">
          <button>
            Café americano <br />
            $5.00
          </button>
          <button>
            Cafe con leche <br />
            $7.00
          </button>
          <button>
            Sandwich de jamón y queso <br />
            $10.00
          </button>
          <button>
            Jugo de frutas natural <br />
            $7.00
          </button>
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
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
