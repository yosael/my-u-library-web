import BookPage from "@/pages/book.page";
import BookListPage from "@/pages/bookList.page";
import CheckoutAdminPage from "@/pages/checkoutAdmin.page";
import CheckoutListAdminPage from "@/pages/checkoutListAdmin.page";
import HomePage from "@/pages/home.page";
import UserPage from "@/pages/user.page";
import UserListPage from "@/pages/userList.page";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import BookAdminPage from "@/pages/bookAdmin.page";
import BookListAdminPage from "@/pages/bookListAdmin.page";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { librarianRoutes, studentRoutes } from "@/routes/users.routes";

export default function AppRoutes() {
  const user = useContext(UserContext);

  const routes = user?.role === "librarian" ? librarianRoutes : studentRoutes;
  return (
    <>
      <BrowserRouter>
        <Navbar routes={routes} />
        <Routes>
          {routes.map(({ path, Component }, index) => {
            return <Route key={index} path={path} element={<Component />} />;
          })}
          <Route path="*" element={<h1>404 - Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
