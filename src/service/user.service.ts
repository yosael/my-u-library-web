import { User } from "@/types/types";

export default class UserService {
  public static async getUsersByRole(): Promise<User[]> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const data = (await response.json()) as User[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`
      );
      const data = (await response.json()) as User;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createUser(user: User): Promise<User> {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = (await response.json()) as User;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
