import { Link, useNavigate } from "react-router-dom";
import "./signupForm.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { type SignupFormData } from "../types/ChatTypes";
import { signupHandler } from "../services/api";

function SignupForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear showed error while typing
    if (name === "password" || name === "confirm_password") {
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      console.log(error);
      return;
    }
    try {
      await signupHandler(formData);
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-log">{error}</p>}

          <button
            type="submit"
            disabled={!formData.email || !formData.password}
          >
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
