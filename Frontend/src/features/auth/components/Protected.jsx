import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = () => {
  const { user, loading } = useAuth();
  
  console.log("Protected user:", user);

  if (loading) {
    return <main>Loading...</main>;
  }

  if(!user){
    return <Navigate to={"/login"}/>
  }


  return <Outlet/>;
};

export default Protected;
