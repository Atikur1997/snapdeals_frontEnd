import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import PrivateRoutes from "./PrivateRoutes";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ProductError from "../components/ErrorPage/ProductError";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        loader:()=>fetch("http://localhost:5000/products"),
        Component: AllProducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
     {
      path: "/myproducts",
      element:(<PrivateRoutes><MyProducts></MyProducts></PrivateRoutes>)
     },
     
{
  path: "/product/:id",

  loader: async ({ params }) => {

    const res = await fetch(
      `http://localhost:5000/products/${params.id}`
    );

    if (!res.ok) {
      throw new Response("Product Not Found", {
        status: 404,
      });
    }

    return res.json();
  },

  element: (
    <PrivateRoutes>
      <ProductDetails />
    </PrivateRoutes>
  ),

  errorElement: <ProductError />,
}
     ,
   
     {
      path: "/mybids",
      element:<PrivateRoutes><MyBids></MyBids></PrivateRoutes>
     },

    ],
  },
]);
export default router;
