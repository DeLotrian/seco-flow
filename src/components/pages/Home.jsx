import { Col, Row, Container } from "react-bootstrap";
import Header from "../ui/Header";
import Body from "../ui/Body";
import { ReactFlowProvider } from "../context/reactFlowContext";

const Home = () => {
  return (
    <Container fluid className="px-0 h-100">
      <Row className="h-100">
        <Col>
          <ReactFlowProvider>
            <Header />
            <Body />
          </ReactFlowProvider>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
