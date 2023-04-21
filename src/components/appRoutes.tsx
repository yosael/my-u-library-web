import BookPage from "@/pages/book.page";
import BookListPage from "@/pages/bookList.page";
import CheckoutAdminPage from "@/pages/checkoutAdmin.page";
import CheckoutListAdminPage from "@/pages/checkoutListAdmin.page";
import HomePage from "@/pages/home.page";
import UserPage from "@/pages/user.page";
import UserListPage from "@/pages/userList.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/checkouts/:id" element={<CheckoutAdminPage />} />
          <Route path="/checkouts" element={<CheckoutListAdminPage />} />
          <Route path="*" element={<h1>404 - Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
