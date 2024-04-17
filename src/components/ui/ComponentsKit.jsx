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
    <Container fluid className=" px-0">
      <Row>
        <Col className="d-flex justify-content-center">
          <ButtonGroup className="compKit">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <Image src="./pictures/Programmer.png" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <Image
                    src="./pictures/TeamLead.png"
                    onDragStart={(event) => onDragStart(event, "input")}
                    draggable
                  />
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  <Image src="./pictures/TechLead.png" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="light" as={ButtonGroup}>
              <Image src="./pictures/Tester.png" />
            </Button>
            <Button variant="light" as={ButtonGroup}>
              <Image src="./pictures/DevOps.png" />
            </Button>
            <Button variant="light" as={ButtonGroup}>
              <Image src="./pictures/ProjectManager.png" />
            </Button>
            <Button
              variant="light"
              as={ButtonGroup}
              onDragStart={(event) => onDragStart(event, "productOwner")}
              draggable
            >
              <Image src="./pictures/ProductOwner.png" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ComponentsKit;
