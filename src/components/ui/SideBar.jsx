import { Row, Col, Container, Table } from "react-bootstrap";
import React, { useState } from "react";
import "../../App.css";
const Header = () => {
  return (
    <Container className="mt-2 sideBar">
      <Row className="justify-content-between">
        <Col className="header">
          <h4>Атрибути</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Значення</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
