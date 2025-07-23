import type { FormEvent } from "react";
import "./loginForm.css";

function LoginForm() {
  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    // Add signin logic here (e.g. API call)
    console.log("Signup submitted");
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
