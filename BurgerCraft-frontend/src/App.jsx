import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx"; 
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import Home from "./pages/home.jsx";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentView("home");
    alert("Logged out successfully!");
  };

  return (
    <div className="App">
      
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        token={token} 
        onLogout={handleLogout} 
      />

      <main className="container-fluid p-0">
        {currentView === "home" && (
          <Home onViewChange={setCurrentView} token={token} />
        )}
        {currentView === "signup" && (
          <Signup onViewChange={setCurrentView} />
        )}
        {currentView === "login" && (
          <Login 
            onViewChange={(view) => {
              if (view === "home") {
                setToken(localStorage.getItem("token")); 
              }
              setCurrentView(view);
            }} 
          />
        )}
      </main>
    </div>
  );
}

export default App;