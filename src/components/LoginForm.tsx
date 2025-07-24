import { useState, type ChangeEvent, type FormEvent } from "react";
import "./loginForm.css";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/ChatTypes";
import { loginHandler } from "../services/api";
import { useAuth } from "./AuthProvider";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginHandler(formData);
      // setting global auth state
      login();
      navigate("/chat");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="username"
            value={formData.username}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {error && <p className="error-log">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
