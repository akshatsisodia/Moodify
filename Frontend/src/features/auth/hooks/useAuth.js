import { useContext, useEffect } from "react";
import { registerUser, loginUser, logoutUser, getMeUser } from "../services/auth.api";
import { AuthContext } from "../authContext";

const useAuth = () => {
  const { loading, setLoading, user, setUser } = useContext(AuthContext);

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await registerUser({ username, email, password });
      setUser(data.user);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await loginUser({ username, email, password });
      setUser(data);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};

export default useAuth; 
