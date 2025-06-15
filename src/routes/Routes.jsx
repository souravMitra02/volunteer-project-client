import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
export const router = createBrowserRouter([
    {
    path: "/",
    element: <MainLayout></MainLayout>,
        errorElement : <ErrorPage></ErrorPage>,
        children: [
            {
            index: true,
            element : <Home></Home>
          },
          {
            path: '/register',
            element : <Register></Register>
          },
          {
            path: '/login',
            element : <Login></Login>
          }
    ]
  },
]);
