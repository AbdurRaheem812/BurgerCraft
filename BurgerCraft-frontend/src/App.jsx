import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx"; 
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import Home from "./pages/home.jsx";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    setCurrentView("home");
    alert("Logged out successfully!");
  };

  return (
    <div className="App">
      
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        userToken={userToken} 
        onLogout={handleLogout} 
      />

      <main className="container-fluid p-0">
        {currentView === "home" && (
          <Home onViewChange={setCurrentView} userToken={userToken} />
        )}
        {currentView === "signup" && (
          <Signup onViewChange={setCurrentView} />
        )}
        {currentView === "login" && (
          <Login 
            onViewChange={(view) => {
              if (view === "home") {
                setUserToken(localStorage.getItem("token")); 
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