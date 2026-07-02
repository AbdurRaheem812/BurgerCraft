function Navbar({ currentView, setCurrentView, userToken, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 shadow-sm">
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentView("home")}
      >
        🍔 BurgerCraft Studio
      </span>
      
      <div className="ms-auto d-flex gap-2">
        <button
          className={`btn btn-sm ${currentView === "home" ? "btn-light" : "btn-outline-light"}`}
          onClick={() => setCurrentView("home")}
        >
          Studio
        </button>

        {userToken ? (
          <button className="btn btn-sm btn-outline-light" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className={`btn btn-sm ${currentView === "signup" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setCurrentView("signup")}
            >
              Sign Up
            </button>
            <button
              className={`btn btn-sm ${currentView === "login" ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setCurrentView("login")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;