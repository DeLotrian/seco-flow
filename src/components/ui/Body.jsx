import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import ComponentsKit from "./ComponentsKit";
import SideBar from "./SideBar";
import FlowProvider from "./FlowProvider";
import "../../App.css";
import { ReactFlowProvider } from "../context/reactFlowContext"; // Импорт вашего провайдера контекста

const Header = () => {
  return (
    <Container fluid className="pageBody px-0">
      <Row className="h-15">
        <Col>
          <ComponentsKit />
        </Col>
      </Row>
      <Row className="h-85">
        <Col className="d-flex h-100">
          <SideBar />
          <FlowProvider />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
