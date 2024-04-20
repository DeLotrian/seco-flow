import React, { useState, useRef, useCallback, MouseEvent } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "../../App.css";

import RectangleComponent from "../flowComponents/ProductOwnerComponent";
import GroupComponent from "../flowComponents/GroupComponent";
const nodeTypes = {
  developer: RectangleComponent,
  techLead: RectangleComponent,
  teamLead: RectangleComponent,
  tester: RectangleComponent,
  devOps: RectangleComponent,
  projectManager: RectangleComponent,
  productOwner: RectangleComponent,
  groupComponent: GroupComponent,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowArea = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { getIntersectingNodes } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeDrag = useCallback((_, node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);
    if (intersections.length > 0) {
      //console.log(intersections);

      setNodes((ns) =>
        ns.map((n) => {
          if (node.id === n.id) {
            n.data.readyToGroup = true;
            n.data.possibleParentId = intersections[0];
          }
          return n;
        })
      );
    } else {
      setNodes((ns) =>
        ns.map((n) => {
          if (node.id === n.id) {
            n.data.readyToGroup = false;
            n.data.possibleParentId = null;
          }
          return n;
        })
      );
    }
  }, []);

  const deleteNode = (id) => {
    console.log(reactFlowInstance.getNodes());
    if (reactFlowInstance.getNode(id)?.data.isParent) {
      setNodes((nds) => nds.filter((node) => node.data.parentId !== id));
    }
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const groupNode = (nodeId, parentId) => {
    setNodes((ns) =>
      ns.map((n) => {
        if (nodeId === n.id) {
          n.position.x = 10;
          n.position.y = 50;
          n.parentId = parentId;
          n.extent = "parent";
          n.data.isGrouped = true;
          n.data.parentId = parentId;
        } else if (parentId === n.id) {
          n.data.isParent = true;
        }
        return n;
      })
    );
  };

  const ungroupNode = (nodeId) => {
    setNodes((ns) =>
      ns.map((n) => {
        if (nodeId === n.id) {
          const parentNode = reactFlowInstance.getNode(n.parentId);
          n.position.x = parentNode.width + parentNode.position.x;
          n.position.y = parentNode.height + parentNode.position.y;
          n.parentId = null;
          n.extent = "";
          n.data.isGrouped = false;
          n.data.parentId = null;
        }
        return n;
      })
    );
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
          label: type,
          id: newId,
          actions: {
            delete: () => {
              deleteNode(newId);
            },
            group: (parentId) => {
              groupNode(newId, parentId);
            },
            ungroup: () => {
              ungroupNode(newId);
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
              onNodeDrag={onNodeDrag}
              onConnect={onConnect}
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
