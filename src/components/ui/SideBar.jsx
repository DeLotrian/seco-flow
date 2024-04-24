import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  FormControl,
} from "react-bootstrap";
import { useReactFlowContext } from "../context/reactFlowContext"; // Adjusted path as needed

const SideBar = () => {
  const { selectedNode, updateNodeAttributes } = useReactFlowContext();
  const [updatedNode, setUpdatedNode] = useState("");

  useEffect(() => {
    setUpdatedNode({ ...selectedNode });
  }, [selectedNode]);

  const handleAttributeValueChange = (index, newValue) => {
    const newAttributes = updatedNode.data.attributes.map((attr, idx) => {
      if (index === idx) {
        return { ...attr, value: newValue };
      }
      return attr;
    });

    setUpdatedNode({
      ...updatedNode,
      data: {
        ...updatedNode.data,
        attributes: newAttributes,
      },
    });
  };

  return (
    <Container fluid className="mt-2 sideBar">
      <Row className="justify-content-between">
        <Col className="header">
          <h4>Атрибути</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Назва</th>
                <th style={{ width: "70%" }}>Значення</th>
              </tr>
            </thead>
            <tbody>
              {updatedNode &&
                updatedNode.data?.attributes.map((attr, index) => (
                  <tr key={attr.name}>
                    <td>{attr.text}</td>
                    <td>
                      <FormControl
                        type="text"
                        value={attr.value}
                        onChange={(e) =>
                          handleAttributeValueChange(index, e.target.value)
                        }
                        aria-label={`Attribute value for ${attr.text}`}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            variant="success"
            onClick={() => {
              updateNodeAttributes(updatedNode.id, updatedNode.data.attributes);
            }}
          >
            Зберегти
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBar;
