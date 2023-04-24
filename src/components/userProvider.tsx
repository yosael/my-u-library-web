import { User, UserContext } from "@/context/userContext";
import { UserLogged } from "@/types/user";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserProviderProps = {
  children: React.ReactNode;
};

const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  role: "",
  isAuth: false,
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(emptyUser);

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
      if (result.status !== 200) throw new Error("Invalid credentials");

      if (!result.ok) throw new Error("Invalid credentials");

      const data = (await result.json()) as UserLogged;
      console.log("login", data);
      if (data?.id) {
        setUser({
          id: data.id,
          name: data.firstName + " " + data.lastName,
          email: data.email,
          role: data.role,
          isAuth: true,
        });
        localStorage.setItem("token", data.token);
      }
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
      setUser(emptyUser);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
