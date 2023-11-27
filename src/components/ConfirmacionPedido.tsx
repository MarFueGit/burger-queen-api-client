import { Dispatch, SetStateAction, useState } from "react";
import "./ConfirmacionPedido.css";
import { Order } from "../types/types";
import { sendOrder } from "../services/orders.service";

//Props
interface ConfirmacionPedidoprops {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  order: Order;
  addNameClient: (name: string) => void;
  resetOrder: () => void;
}

export default function ConfirmacionPedido({
  open,
  setOpen,
  order,
  addNameClient,
  resetOrder,
}: ConfirmacionPedidoprops) {
  if (open) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <section className="section-modal">
      {open && (
        <div className="modal">
          <div onClick={() => setOpen(false)} className="overlay"></div>
          {success || error ? (
            <div className="container-toast">
              <div
                className={
                  success ? "toast-success success" : "toast-success error"
                }
              >
                <div className="container-1">
                  <i
                    className={
                      success ? "fa-solid fa-check" : "fas fa-times-circle"
                    }
                  ></i>
                </div>
                <div className="container-2">
                  <p>{success ? "Éxito" : "Error"}</p>
                  <p data-testid={"messageToast"}>
                    {success ? "Se envio la orden" : errorMessage}
                  </p>
                </div>
                <button
                  data-testid={"buttonToast"}
                  onClick={() => {
                    setSuccess(false);
                    setError(false);
                    setOpen(false);
                    resetOrder();
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-content">
              <h3>Escriba nombre del cliente y confirme pedido</h3>
              <input
                type="text"
                placeholder="Nombre del cliente"
                onChange={(e) => addNameClient(e.target.value)}
              />
              <button className="close-modal" onClick={() => setOpen(false)}>
                <i className="fa-solid fa-x"></i>
              </button>
              <div className="buttons-modal">
                <button
                  className="confirmar"
                  onClick={async () => {
                    try {
                      const response = await sendOrder(order);
                      console.log("respuesta de la api:", response);
                      setSuccess(true);
                    } catch (error) {
                      setError(true);
                      setErrorMessage(String(error));
                      console.log("ERROR: ", error);
                    }
                  }}
                >
                  Confirmar
                </button>
                <button className="cancelar" onClick={() => setOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
