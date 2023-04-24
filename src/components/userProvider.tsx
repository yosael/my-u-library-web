import { User, UserContext } from "@/context/userContext";
import React, { useState } from "react";

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>({
    id: "",
    name: "",
    email: "",
    role: "",
    isAuth: false,
  });

  const login = async (email: string, password: string) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    console.log("logoutMethod: ");
    try {
      const result = await fetch(
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
