import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext.jsx";
import Navbar from "./components/navbar.jsx"; 
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import toast from "react-hot-toast";

function RootLayout() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <main className="container-fluid p-0">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> }
    ]
  }
]);

export default function App() {
  return (    
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  )
}