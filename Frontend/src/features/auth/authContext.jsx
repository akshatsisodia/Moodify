import { createContext, useEffect, useState } from "react";
import { getMeUser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

      const handleGetMe = async () => {
        try {
          setLoading(true);
          const data = await getMeUser();
          setUser(data.user);
        } catch (err) {
          return err;
        } finally {
          setLoading(false);
        }
      };

    
      useEffect(()=>{
        handleGetMe();
      },[])


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading, handleGetMe}}>
            {children}
        </AuthContext.Provider>
    )
}