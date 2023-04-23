import CheckoutService from "@/service/checkout.service";
import { ActionResult } from "@/types/actions";
import { CheckoutListResponse } from "@/types/checkout";
import { useState, useEffect } from "react";
export function useFetchCheckouts(userId?: string) {
  const [checkouts, setCheckouts] = useState<CheckoutListResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  useEffect(() => {
    const getCheckouts = async () => {
      setLoading(true);
      try {
        setActionResult(null);
        if (userId) {
          const result = await CheckoutService.getCheckoutsByUserId(userId);
          setCheckouts(result);
        } else {
          const result = await CheckoutService.getCheckouts();
          setCheckouts(result);
        }
      } catch (error) {
        setActionResult({
          message: (error as Error).message,
          messageType: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    getCheckouts();
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

  return { checkouts, loading, actionResult, handleActionMessageClose };
}
