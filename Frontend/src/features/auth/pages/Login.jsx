import "../styles/login.scss";
import Formgroup from "../components/Formgroup";
import { useState } from "react";
import { Link } from "react-router";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <main className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form >
          <Formgroup value={email} placeholder={"Enter your email..."} 
          onChange={(e)=>{setEmail(e.target.value)}} label={"Email"}/>
          <Formgroup value={password} placeholder={"Enter your password..."}
          onChange={(e)=>{setPassword(e.target.value)}} label={"Password"}/>
          <button className="button" type="submit">Submit</button>
        </form>
        <p>Don't have an account ? <Link to="/register">Register</Link></p>
      </div>
    </main>
  );
};

export default Login;
