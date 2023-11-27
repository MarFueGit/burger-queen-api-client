import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import IngresarPedido from "./components/IngresarPedido";
import VerPedidos from "./components/VerPedidos";

// Creamos nuestro router de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/ingresar-pedido",
    element: <IngresarPedido />
  },
  {
    path: "/ver-pedidos",
    element: <VerPedidos />
  }
]);

// Renderizamos el router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
