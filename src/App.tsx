import { Container } from "@mui/material";
import "./App.css";
import AppRoutes from "./components/appRoutes";

function App() {
  return (
    <div className="App">
      <Container>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
