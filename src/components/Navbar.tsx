import { Link } from "react-router-dom";

function Navbar() {
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
    </div>
  );
}

export default Navbar