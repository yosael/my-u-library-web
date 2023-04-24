import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import LoginPage from "@/pages/login.page";
import { librarianRoutes, studentRoutes } from "@/routes/users.routes";
import ProtectedRoute from "./protectedRoute";
import Navbar from "./navbar";

export default function AppRoutes() {
  const { user } = useContext(UserContext);
  const routes = user?.role === "librarian" ? librarianRoutes : studentRoutes;
  const location = useLocation();
  console.log("The user is logged in?", user);
  useEffect(() => {
    console.log("User changed", user);
  }, [user]);

  return (
    <>
      {location.pathname !== "/login" && <Navbar routes={routes} />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {routes
          .filter((item) => item.isProtected)
          .map(({ path, Component }, index) => {
            return (
              <Route
                key={`rt${path}`}
                path={path}
                element={
                  <ProtectedRoute
                    isAuthenticated={user?.isAuth || false}
                    redirectPath="/login"
                  />
                }
              >
                <Route key={`rt${path}`} path={path} element={<Component />} />
              </Route>
            );
          })}
      </Routes>
    </>
  );
}
