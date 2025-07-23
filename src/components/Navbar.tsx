import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
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
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
    </div>
  );
}

export default Navbar;
