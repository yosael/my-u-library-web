import { Container } from "@mui/material";
import { Suspense } from "react";
import "./App.css";
import AppRoutes from "./components/appRoutes";
import Loader from "./components/loader";
import { UserContext } from "./context/userContext";
import { User } from "./context/userContext";

const user: User = {
  id: "644080b412c1f702e3c1baf4",
  name: "Edwin Librarian",
  email: "",
  role: "student",
  isAuth: true,
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Container>
          <UserContext.Provider value={user}>
            <AppRoutes />
          </UserContext.Provider>
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
