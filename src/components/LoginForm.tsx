import "./loginForm.css";

function LoginForm() {
  const loginHandler = () => {};
  return (
    <>
      <div className="login-form">
        <form onSubmit={loginHandler}>
          <input type="text" placeholder="email" />
          <input type="text" placeholder="password" /><br />
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
