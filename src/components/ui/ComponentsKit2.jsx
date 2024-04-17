import {
  Row,
  Col,
  Container,
  Button,
  Image,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "../../App.css";
const ComponentsKit = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Container fluid className="mt-2 px-0">
      <Row>
        <Col className="d-flex justify-content-center">
          <ButtonGroup className="compKit">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                onDragStart={(event) => onDragStart(event, "group")}
                draggable
              >
                Розробник
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="1"
                  onDragStart={(event) => onDragStart(event, "teamLead")}
                  draggable
                >
                  Керівник команди
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onDragStart={(event) => onDragStart(event, "techLead")}
                  draggable
                >
                  Тех лідер
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "tester")}
              draggable
            >
              Тестувальник
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "devOps")}
              draggable
            >
              DevOps
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "projectManager")}
              draggable
            >
              Керівник проєкту
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "productOwner")}
              draggable
            >
              Власник продукту
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "groupComponent")}
              draggable
            >
              Група
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ComponentsKit;
