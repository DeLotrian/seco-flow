import { Row, Col, Container } from "react-bootstrap";
import ComponentsKit from "./ComponentsKit";
import SideBar from "./SideBar";
import FlowProvider from "./FlowProvider";
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
        <Col className="d-flex">
          <SideBar />
          <FlowProvider />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
