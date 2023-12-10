import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import { productsData } from "./api/Api";
import Product from "./pages/product";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: productsData },
      { path: "/product/:id", element: <Product /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
