import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserById } from "../../services/users.service";
import { User } from "../../types/types";

export default function EditarTrabajador() {
  // usamos el hook useNavigate para navegar a AgregarTrabajador
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { userId } = useParams();

  useEffect(() => {
    getUserById(Number(userId))
      .then((user: User) => {
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role);
      })
      .catch((error) => console.error(error));
  }, []);

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
            const userToUpdate: User = {
              email,
              password,
              role,
            };
            const updatedUser: User = await updateUserById(
              Number(userId),
              userToUpdate
            );
            if (updatedUser) {
              navigate("/listado-trabajadores");
            } else {
              alert("Hubo un error al editar el usuario");
            }
          }}
        >
          <h2>Editar trabajador</h2>
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
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </section>
  );
}
