import { Row, Col, Container } from "react-bootstrap";
import "../../App.css";
const Header = () => {
  return (
    <Container fluid className="pageHeader px-0">
      <Row className="h-100">
        <Col className="d-flex align-items-center w-100">
          <h3 className="px-3">SECO flow</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
