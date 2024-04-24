import React, { useState, useRef, useCallback, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  useOnSelectionChange,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "../../App.css";
import {
  ReactFlowProvider,
  useReactFlowContext,
} from "../context/reactFlowContext";

import RoleComponent from "../flowComponents/RoleComponent";
import ThingComponent from "../flowComponents/ThingComponent";
import GroupComponent from "../flowComponents/GroupComponent";
import DefaultEdge from "../flowComponents/DefaultEdge";
const nodeTypes = {
  developer: RoleComponent,
  techLead: RoleComponent,
  teamLead: RoleComponent,
  tester: RoleComponent,
  devOps: RoleComponent,
  projectManager: RoleComponent,
  productOwner: RoleComponent,
  groupComponent: GroupComponent,
  tool: ThingComponent,
  task: ThingComponent,
  project: ThingComponent,
};

const edgeTypes = {
  "default-edge": DefaultEdge,
};

let id = 0,
  edgeId = 0;
const getId = () => `dndnode_${id++}`;
const getEdgeId = () => `dndedge_${edgeId++}`;

const FlowArea = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { nodes, setNodes, onNodesChange, setSelectedNode } =
    useReactFlowContext();
  const { getIntersectingNodes } = useReactFlow();

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes[0]);
    },
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        id: getEdgeId(),
        type: "default-edge",
        data: {
          id: id,
          actions: {
            delete: () => {
              setEdges((es) => es.filter((e) => e.data.id !== id));
            },
          },
        },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
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
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const type = data.nodeType;
      const color = data.color;
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
          color: color,
          attributes: [
            {
              text: "Тип",
              name: "type",
              value: type,
            },
            {
              text: "Назва",
              name: "name",
              value: type,
            },
          ],
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

      setNodes((nds) => {
        if (newNode.type === "groupComponent") {
          return [newNode, ...nds]; // Prepend the new group node
        } else {
          return [...nds, newNode]; // Append the new node
        }
      });
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <Container fluid className="px-0 mt-2 flowWrapper">
        <div className="flowArea" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
      </Container>
    </ReactFlowProvider>
  );
};

export default FlowArea;
