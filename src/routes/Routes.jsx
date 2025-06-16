import {
  createBrowserRouter
  
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AddVolunteerPost from "../pages/AddVolunteerPost";
import PostDetails from "../pages/PostDetails";
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
          },
          {
        path: '/add-post',
        element: (
          <PrivateRoute>
           <AddVolunteerPost></AddVolunteerPost>
          </PrivateRoute>
        )
          },
          {
        path: "/post/:id",
        element: (
          <PrivateRoute>
           <PostDetails></PostDetails>
          </PrivateRoute>
        )
      }
    ]
  },
]);
