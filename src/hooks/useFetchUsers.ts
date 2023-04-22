import UserService from "@/service/user.service";
import { ActionResult } from "@/types/actions";
import { UserResponse } from "@/types/user";
import { useState, useEffect } from "react";

export function useFetchUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setActionResult(null);
      try {
        const result = await UserService.findAll();
        setUsers(result);
      } catch (error) {
        setActionResult({
          message: (error as Error).message,
          messageType: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleActionMessageClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setActionResult(null);
  };

  return { users, loading, actionResult, handleActionMessageClose };
}
