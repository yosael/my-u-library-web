import { CheckoutRequest, CheckoutResponse } from "@/types/checkout";

export default class CheckoutService {
  public static async getCheckoutById(id: number): Promise<CheckoutResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/${id}`
      );
      const data = (await response.json()) as CheckoutResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createCheckout(
    checkout: CheckoutRequest
  ): Promise<CheckoutResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkout),
        }
      );
      const data = (await response.json()) as CheckoutResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getCheckouts() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts`
      );
      const data = (await response.json()) as CheckoutResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async returnBook(checkoutId: string) {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/return/${checkoutId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
