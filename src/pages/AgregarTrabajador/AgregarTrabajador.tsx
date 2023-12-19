import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./AgregarTrabajador.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/users.service";
import { Token } from "../../types/types";

export default function AgregarTrabajador() {
  // usamos el hook useNavigate para navegar a AgregarTrabajador
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  return (
    <section>
      <Navbar />
      <div className="form-container">
        <button onClick={() => navigate("/listado-trabajadores")}>
          Regresar
        </button>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();
            const newUser: Token = await createUser(email, password, role);
            if (newUser.accessToken) {
              navigate("/listado-trabajadores");
            } else {
              alert("Hubo un error al crear el usuario");
            }
          }}
        >
          <h2>Agregar trabajador</h2>
          <label htmlFor="email">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Agregar Email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Escribe la contraseña"
              name="password"
              required
            />
          </label>

          <select
            required
            onChange={(e) => setRole(e.target.value)}
            value={role}
            name="role"
            id="roles"
          >
            <option value="">Elige un rol</option>
            <option value="admin">Admin</option>
            <option value="chef">Chef</option>
            <option value="waiter">Waiter</option>
          </select>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
