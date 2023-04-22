import UserService from "@/service/user.service";
import { UserResponse } from "@/types/user";
import { useState, useEffect } from "react";

export function useFetchUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await UserService.findAll();
        setUsers(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return { users, loading, error };
}
