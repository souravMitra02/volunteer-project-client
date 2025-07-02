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
import AllVolunteerPosts from "../pages/AllVolunteerPosts";  
import MyPosts from "../pages/MyPosts";
import VolunteerDetails from "../pages/VolunteerDetails";
import BeVolunteerPage from "../pages/BeVolunteerModal";
import UpdatePost from "../pages/UpdatePost";
import Contact from "../pages/Contact";
import About from "../pages/About";
import ImpactReport from "../pages/ImpactReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
     
      {
        path: '/posts',
        element: <AllVolunteerPosts></AllVolunteerPosts>
      },
   
      {
        path: 'contact',
        element : <Contact></Contact>
      },
      {
        path: 'reports',
        element : <ImpactReport></ImpactReport>
      },
      {
        path: 'about',
        element : <About></About>
      },
      {
        path: '/volunteer-posts',
        element: (
          <PrivateRoute>
            <AddVolunteerPost></AddVolunteerPost>
          </PrivateRoute>
        )
      },
      {
        path: "/volunteer-posts/:id",
          element:(
    <PrivateRoute>
    <VolunteerDetails></VolunteerDetails>
    </PrivateRoute>
          )
        
      },
     
      {
  path: '/be-volunteer/:id',
  element: (
    <PrivateRoute>
      <BeVolunteerPage></BeVolunteerPage>
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
      },
      {
        path:"/update-post/:id",
        element: (
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>
        )
   },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        )
      },
      
    ]
  },
]);
