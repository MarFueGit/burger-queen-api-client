import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home/Home";
import IngresarPedido from "./pages/IngresarPedido/IngresarPedido";
import VerPedidos from "./components/VerPedidos";
import PedidosListos from "./components/PedidosListos";
import HistorialPedidos from "./components/HistorialPedidos";

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
    element: <IngresarPedido />,
  },
  {
    path: "/ver-pedidos",
    element: <VerPedidos />,
  },
  {
    path: "/pedidos-listos",
    element: <PedidosListos />,
  },
  {
    path: "/historial-pedidos",
    element: <HistorialPedidos />,
  },
]);

// Renderizamos el router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
