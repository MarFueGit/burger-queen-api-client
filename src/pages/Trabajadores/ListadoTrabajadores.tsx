import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getUsers } from "../../services/users.service";
import { User } from "../../types/types";

export default function ListadoTrabajadores() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers()
      .then((users: User[]) => {
        console.log("USERS: ", users);
        setUsers(users);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Navbar />
      <section className="container-table">
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
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <a href="">
                    <i className="fa-solid fa-pencil"></i>
                  </a>
                </td>
                <td>
                  <a href="">
                    {" "}
                    <i className="fa-solid fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
