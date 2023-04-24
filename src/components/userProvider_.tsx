import { UserContext } from "@/context/userContext";
import { useAppDispatch } from "@/hooks/storeHooks";
import { UserLogged } from "@/types/user";
import React, { useContext, useState } from "react";
import { loginStore, logoutStore } from "@/store/userSlice";

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    try {
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      /*const result = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      if (data?.user) {
        setUser(data.user);
      }*/
      dispatch(logoutStore());
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
