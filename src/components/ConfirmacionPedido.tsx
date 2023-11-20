import { Dispatch, SetStateAction } from "react";
import "./ConfirmacionPedido.css";

//Props
interface ConfirmacionPedidoprops {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}

export default function ConfirmacionPedido({
  open,
  setOpen,
  onConfirm,
}: ConfirmacionPedidoprops) {
  if (open) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <section className="section-modal">
      {open && (
        <div className="modal">
          <div onClick={() => setOpen(false)} className="overlay"></div>
          <div className="modal-content">
            <h3>Escriba nombre del cliente y confirme pedido</h3>
            <input type="text" placeholder="Nombre del cliente" />
            <button className="close-modal" onClick={() => setOpen(false)}>
              <i className="fa-solid fa-x"></i>
            </button>
            <div className="buttons-modal">
              <button className="confirmar" onClick={() => onConfirm()}>
                Confirmar
              </button>
              <button className="cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
