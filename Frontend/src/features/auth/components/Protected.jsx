import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <main>Loading...</main>;
  }

  if(!user){
    return <Navigate to={"/login"}/>
  }

  return <Outlet/>;
};

export default Protected;
