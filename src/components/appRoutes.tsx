import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "@/pages/login.page";
import { librarianRoutes, studentRoutes } from "@/routes/users.routes";
import ProtectedRoute from "./protectedRoute";
import Navbar from "./navbar";
import { useAppSelector } from "@/hooks/storeHooks";
import { selectUser } from "@/store/userSlice";

export default function AppRoutes() {
  const user = useAppSelector(selectUser);
  const routes = user?.role === "librarian" ? librarianRoutes : studentRoutes;
  const location = useLocation();

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
