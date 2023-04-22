export type CheckoutRequest = {
  userId: string;
  bookId: string;
  checkoutDate: Date;
  returnDate: Date | null;
  status: string;
};

export type CheckoutResponse = {
  id: string;
  userId: string;
  bookId: string;
  checkoutDate: Date;
  returnDate: Date | null;
  status: string;
};
