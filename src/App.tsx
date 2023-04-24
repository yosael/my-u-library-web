import { Container } from "@mui/material";
import { Suspense } from "react";
import "./App.css";
import Loader from "./components/loader";
import UserProvider from "./components/userProvider_";
import AppRoutes from "./components/appRoutes";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/storeConfig";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <Container>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Container>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
