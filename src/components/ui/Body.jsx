import { Row, Col, Container } from "react-bootstrap";
import ComponentsKit from "./ComponentsKit2";
import FlowArea from "./FlowArea";
import "../../App.css";
const Header = () => {
  return (
    <Container fluid className="pageBody px-0">
      <Row>
        <Col>
          <ComponentsKit />
        </Col>
      </Row>
      <Row>
        <Col>
          <FlowArea />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
