import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <div className="nav_container">
      <div className="left_side">
        <div className="logo">
          <Link to="/">Legal Assistant</Link>
        </div>
      </div>
      <div className="right_side">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
