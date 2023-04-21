import { Checkout } from "@/types/checkout";

export default class CheckoutService {
  public static async getCheckoutById(id: number): Promise<Checkout> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/${id}`
      );
      const data = (await response.json()) as Checkout;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async createCheckout(checkout: Checkout): Promise<Checkout> {
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
      const data = (await response.json()) as Checkout;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
