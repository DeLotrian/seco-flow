import { useState, useMemo } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useReactFlowContext } from "../context/reactFlowContext";

function CalculationsModal() {
  const { nodes } = useReactFlowContext();
  const [show, setShow] = useState(false);

  const [months, setMonths] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAttributeValue = (attributes, attrName) => {
    const attribute = attributes.find((attr) => attr.name === attrName);
    return attribute ? attribute.value : ""; // Return attribute value or empty string if not found
  };

  // Filter nodes by type for different tables
  const personnelNodes = nodes.filter((node) =>
    [
      "developer",
      "techLead",
      "teamLead",
      "tester",
      "projectManager",
      "productOwner",
    ].includes(node.type)
  );
  const toolNodes = nodes.filter((node) => node.type === "tool");

  const totalCost = useMemo(() => {
    let total = 0;
    nodes.forEach((node) => {
      if (
        [
          "developer",
          "techLead",
          "teamLead",
          "tester",
          "projectManager",
          "productOwner",
        ].includes(node.type)
      ) {
        const salaryRate = getAttributeValue(
          node.data.attributes,
          "salaryRate"
        );
        const coefficient = getAttributeValue(
          node.data.attributes,
          "coefficientWork"
        );
        total += salaryRate * coefficient * months; // Assuming 160 working hours per month
      } else if (node.type === "tool") {
        const monthlyCost = getAttributeValue(
          node.data.attributes,
          "monthlyCost"
        );
        total += monthlyCost * months;
      }
    });
    return total;
  }, [nodes, months]); // Dependency array to trigger recalculation

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Розрахунки
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Розрахунки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Місяці</InputGroup.Text>
            <Form.Control
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              min="1"
            />
            <InputGroup.Text>
              Загальна вартість: &nbsp;<b>{totalCost.toFixed(2)}</b>&nbsp;ум.од.
            </InputGroup.Text>
          </InputGroup>

          {personnelNodes.length > 0 && (
            <Row className="mb-4">
              <Col>
                <h5>Особи</h5>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Назва</th>
                      <th style={{ width: "35%" }}>Ставка</th>
                      <th style={{ width: "35%" }}>Коефіцієнт</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personnelNodes.map((node) => (
                      <tr key={node.data.id}>
                        <td>
                          {getAttributeValue(node.data.attributes, "name")}
                        </td>
                        <td>
                          {getAttributeValue(
                            node.data.attributes,
                            "salaryRate"
                          )}
                        </td>
                        <td>
                          {getAttributeValue(
                            node.data.attributes,
                            "coefficientWork"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}

          {toolNodes.length > 0 && (
            <Row>
              <Col>
                <h5>Інструменти</h5>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Назва</th>
                      <th style={{ width: "70%" }}>Щомісячна вартість</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toolNodes.map((node) => (
                      <tr key={node.data.id}>
                        <td>
                          {getAttributeValue(node.data.attributes, "name")}
                        </td>
                        <td>
                          {getAttributeValue(
                            node.data.attributes,
                            "monthlyCost"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleClose}>
            Закрити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalculationsModal;
