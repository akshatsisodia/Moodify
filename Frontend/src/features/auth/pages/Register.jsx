import { useState } from "react";
import "../styles/register.scss";
import Formgroup from "../components/Formgroup";
import { Link } from "react-router";
const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <main className="register-page">
      <div className="form-container">
        <h2>Register User</h2>
        <form>
          <Formgroup value={username} placeholder={"Enter your username..."}
          onChange={(e)=>{setUsername(e.target.value)}} label={"Username"}/>
          <Formgroup value={email} placeholder={"Enter your email..."} 
          onChange={(e)=>{setEmail(e.target.value)}} label={"Email"}/>
          <Formgroup value={password} placeholder={"Enter your password..."}
          onChange={(e)=>{setPassword(e.target.value)}} label={"Password"}/>
          <button className="button" type="submit">Submit</button>
        </form>
        <p>Already have an account ? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register