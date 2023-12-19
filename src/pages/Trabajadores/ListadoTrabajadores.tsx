import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./ListadoTrabajadores.css";
import { getUsers } from "../../services/users.service";
import { User } from "../../types/types";
import { useNavigate } from "react-router-dom";

export default function ListadoTrabajadores() {
  // usamos el hook useNavigate para navegar a AgregarTrabajador
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>({
    email: "",
    id: 0,
    role: "",
    password: "",
  });
  useEffect(() => {
    getUsers()
      .then((users: User[]) => {
        console.log("USERS: ", users);
        setUsers(users);
      })
      .catch((error) => console.error(error));

    // obtenemos el usuario actual
    const userFromLocalStorage = localStorage.getItem("user");
    const user = JSON.parse(userFromLocalStorage ?? "");
    console.log("USUARIO ACTUAL convertido: ", user);
    setCurrentUser(user);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="container-table">
        <div className="boton-trabajador">
          <button
            onClick={() => navigate("/agregar-trabajador")}
            disabled={currentUser?.role !== "admin"}
          >
            Agregar trabajador
          </button>
        </div>
        <table className="table">
          <caption>Lista de trabajadores</caption>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Role</th>
              <th>Acción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, i: number) => (
              <tr key={i}>
                <td data-label="Id">{user.id}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.role}</td>
                <td data-label="Acción">
                  <button
                    disabled={currentUser?.role !== "admin"}
                    onClick={() => alert("Deseas Editar")}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </td>
                <td data-label="Acción">
                  <button
                    disabled={currentUser?.role !== "admin"}
                    onClick={() => alert("Deseas eliminar")}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
