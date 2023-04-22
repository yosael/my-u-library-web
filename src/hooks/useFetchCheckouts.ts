import CheckoutService from "@/service/checkout.service";
import { ActionResult } from "@/types/actions";
import { CheckoutResponse } from "@/types/checkout";
import { useState, useEffect } from "react";
export function useFetchCheckouts() {
  const [checkouts, setCheckouts] = useState<CheckoutResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  useEffect(() => {
    const getCheckouts = async () => {
      setLoading(true);
      try {
        setActionResult(null);
        const result = await CheckoutService.getCheckouts();
        setCheckouts(result);
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