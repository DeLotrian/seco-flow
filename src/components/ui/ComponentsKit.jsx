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
  const onDragStart = (event, nodeType, color) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        nodeType: nodeType,
        color: color,
      })
    );
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
                onDragStart={(event) =>
                  onDragStart(event, "developer", "#F6F5F2")
                }
                style={{ backgroundColor: "#F6F5F2" }}
                draggable
              >
                Розробник
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="1"
                  onDragStart={(event) =>
                    onDragStart(event, "teamLead", "#FFEFEF")
                  }
                  style={{ backgroundColor: "#FFEFEF" }}
                  draggable
                >
                  Керівник команди
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onDragStart={(event) =>
                    onDragStart(event, "techLead", "#F3D0D7")
                  }
                  style={{ backgroundColor: "#F3D0D7" }}
                  draggable
                >
                  Тех лідер
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "tester", "#7C9D96")}
              style={{ backgroundColor: "#7C9D96" }}
              draggable
            >
              Тестувальник
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) =>
                onDragStart(event, "projectManager", "#F4F2DE")
              }
              style={{ backgroundColor: "#F4F2DE" }}
              draggable
            >
              Керівник проєкту
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) =>
                onDragStart(event, "productOwner", "#A1CCD1")
              }
              style={{ backgroundColor: "#A1CCD1" }}
              draggable
            >
              Власник продукту
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "groupComponent")}
              style={{ backgroundColor: "#ffc3c373" }}
              draggable
            >
              Група
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <ButtonGroup className="compKit">
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "tool", "#E5D4FF")}
              style={{ backgroundColor: "#E5D4FF" }}
              draggable
            >
              Інструмент
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "task", "#E1F0DA")}
              style={{ backgroundColor: "#E1F0DA" }}
              draggable
            >
              Задача
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "project", "#99BC85")}
              style={{ backgroundColor: "#99BC85" }}
              draggable
            >
              Проєкт
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ComponentsKit;
