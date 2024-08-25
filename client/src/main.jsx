import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import BuyerDashboard from './pages/BuyerDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <ProtectedRoute children={<Login/>} isRequiresAuth={false}/>,
      },
      {
        path: "/signup",
        element: <ProtectedRoute children={<Signup/>} isRequiresAuth={false}/>,
      },
      {
        path: "/seller/profile",
        element: <ProtectedRoute children={<SellerDashboard/>} isRequiresAuth={true}/>,
      },
      {
        path: "/buyer/profile",
        element: <ProtectedRoute children={<BuyerDashboard/>} isRequiresAuth={true}/>,
      },
      // {
      //   path: "contacts/:contactId",
      //   element: <h1>Contact</h1>,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
