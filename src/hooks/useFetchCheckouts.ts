import CheckoutService from "@/service/checkout.service";
import { CheckoutResponse } from "@/types/checkout";
import { useState, useEffect } from "react";
export function useFetchCheckouts() {
  const [checkouts, setCheckouts] = useState<CheckoutResponse[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCheckouts = async () => {
      setLoading(true);
      try {
        const result = await CheckoutService.getCheckouts();
        setCheckouts(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getCheckouts();
  }, []);
  return { checkouts, loading };
}
