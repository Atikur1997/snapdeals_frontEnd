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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
      loader:({params})=>fetch(`http://localhost:5000/products/${params.id}`),
      element:(<PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>)
     },
   
     {
      path: "/mybids",
      element:<PrivateRoutes><MyBids></MyBids></PrivateRoutes>
     },

    ],
  },
]);
export default router;
