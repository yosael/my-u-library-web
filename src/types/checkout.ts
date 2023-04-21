export type Checkout = {
  id: string;
  userId: string;
  bookId: string;
  checkoutDate: Date;
  returnDate: Date | null;
  status: string;
};
