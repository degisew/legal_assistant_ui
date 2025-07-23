import { Link } from "react-router-dom";
import "./signupForm.css";
import type { FormEvent } from "react";

function SignupForm() {
  const signupHandler = (e: FormEvent) => {
    e.preventDefault();
    // Add signup logic here (e.g. API call)
    console.log("Signup submitted");
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={signupHandler}>
          {/* <input type="text" placeholder="Full Name" required /> */}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
