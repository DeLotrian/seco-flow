import React, { useState, useRef, useCallback } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "../../App.css";

import ProductOwnerComponent from "../flowComponents/ProductOwnerComponent";
const nodeTypes = {
  productOwner: ProductOwnerComponent,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowArea = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newId = getId();

      const newNode = {
        id: newId,
        type,
        position,
        data: {
          label: `${type} node`,
          id: newId,
          actions: {
            delete: () => {
              deleteNode(newId);
            },
          },
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <Container fluid className="pageBody px-0 mt-2">
      <Row>
        <Col>
          <div className="flowArea" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FlowArea;
