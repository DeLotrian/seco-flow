import { Col, Row, Container } from "react-bootstrap";
import Header from "../ui/Header";
import Body from "../ui/Body";

const Home = () => {
  return (
    <Container fluid className="px-0 h-100">
      <Row className="h-100">
        <Col>
          <Header />
          <Body />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
