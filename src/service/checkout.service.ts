import {
  CheckoutListResponse,
  CheckoutRequest,
  CheckoutResponse,
} from "@/types/checkout";

export default class CheckoutService {
  public static async getCheckoutById(
    id: string
  ): Promise<CheckoutListResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/${id}`
      );
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as CheckoutListResponse;
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
      if (!response.ok) throw new Error(await response.text());
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
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as CheckoutListResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getCheckoutsByUserId(userId: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/user/${userId}`
      );
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as CheckoutListResponse[];
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async returnBook(
    checkoutId: string
  ): Promise<CheckoutListResponse> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/checkouts/return/${checkoutId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as CheckoutListResponse;
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
