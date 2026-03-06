import { useState } from "react";
import "../styles/register.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h2>Register User</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={username}
            placeholder={"Enter your username..."}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
          />
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
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
