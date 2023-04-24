import { UserLogged, UserRequest, UserResponse } from "@/types/user";

export default class UserService {
  public static async getUsersByRole(): Promise<UserResponse[]> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = (await response.json()) as UserResponse[];
      if (!response.ok) throw new Error(response.statusText);
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = (await response.json()) as UserResponse;
      if (!response.ok) throw new Error(response.statusText);
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createUser(user: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async updateUser(
    id: string,
    user: UserRequest
  ): Promise<UserResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as UserResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async findAll(): Promise<UserResponse[]> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as UserResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async login(email: string, password: string) {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (result.status !== 200) throw new Error("Invalid credentials");

      if (!result.ok) throw new Error("Invalid credentials");

      const data = (await result.json()) as UserLogged;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
