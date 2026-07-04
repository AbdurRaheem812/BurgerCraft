import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar({ onLogout }) {
  const { isAuthenticated } = useAuth(); // Consume directly from global store
  
  const getNavClass = ({ isActive }) => 
    `btn btn-sm ${isActive ? "btn-light" : "btn-outline-light"}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 shadow-sm">
      <Link to="/" className="navbar-brand fw-bold text-decoration-none text-white">
        🍔 BurgerCraft Studio
      </Link>
      
      <div className="ms-auto d-flex gap-2">
        <NavLink to="/" className={getNavClass} end>Studio</NavLink>

        {isAuthenticated ? (
          <button className="btn btn-sm btn-outline-light" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/signup" className={getNavClass}>Sign Up</NavLink>
            <NavLink to="/login" className={getNavClass}>Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;