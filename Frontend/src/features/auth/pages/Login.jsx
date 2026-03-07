import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/")
  };

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={email}
            placeholder={"Enter your email..."}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
          />
          <FormGroup
            value={password}
            placeholder={"Enter your password..."}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
