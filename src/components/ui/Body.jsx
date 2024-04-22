import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import ComponentsKit from "./ComponentsKit";
import SideBar from "./SideBar";
import FlowProvider from "./FlowProvider";
import "../../App.css";
import { ReactFlowProvider } from "../context/reactFlowContext"; // Импорт вашего провайдера контекста

const Header = () => {
  return (
    <ReactFlowProvider>
      {" "}
      {/* Обертываем всю структуру в ваш провайдер контекста */}
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
    </ReactFlowProvider>
  );
};

export default Header;
