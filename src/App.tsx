import { Container } from "@mui/material";
import { Suspense } from "react";
import "./App.css";
import Loader from "./components/loader";
import UserProvider from "./components/userProvider";
import AppRoutes from "./components/appRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Container>
          <UserProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </UserProvider>
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
