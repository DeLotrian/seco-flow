import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/Home";

function App() {
  return (
    <Container fluid className="App">
      <Home />
    </Container>
  );
}

export default App;
