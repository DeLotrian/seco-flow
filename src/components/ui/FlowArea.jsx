import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  faFileArrowDown,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useOnSelectionChange,
  Controls,
  Background,
  useReactFlow,
  ControlButton,
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
  const { getIntersectingNodes, setViewport } = useReactFlow();

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
      const newId = getEdgeId();
      const edge = {
        ...connection,
        id: newId,
        type: "default-edge",
        data: {
          id: newId,
          actions: {
            delete: () => {
              setEdges((es) =>
                es.filter((e) => {
                  console.log(e);
                  return e.id !== newId;
                })
              );
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
          return [newNode, ...nds];
        } else {
          return [...nds, newNode];
        }
      });
    },
    [reactFlowInstance]
  );

  const onSaveToFile = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const blob = new Blob([JSON.stringify(flow)], {
        type: "application/json",
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "flow_backup.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  }, [reactFlowInstance]);

  const onRestoreFromFile = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        try {
          const flow = JSON.parse(text);
          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport || {};

            // Restoring nodes with functions
            const restoredNodes = flow.nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                actions: {
                  delete: () => {
                    setNodes((currentNodes) =>
                      currentNodes.filter((n) => n.id !== node.id)
                    );
                  },
                  group: (parentId) => {
                    groupNode(node.id, parentId);
                  },
                  ungroup: () => {
                    ungroupNode(node.id);
                  },
                },
              },
            }));

            // Optionally restore edges if they have actions
            const restoredEdges = flow.edges.map((edge) => ({
              ...edge,
              data: {
                ...edge.data,
                actions: {
                  delete: () => {
                    setEdges((es) => es.filter((e) => e.id !== edge.id));
                  },
                },
              },
            }));

            setNodes(restoredNodes);
            setEdges(restoredEdges);
            setViewport({ x, y, zoom });
          }
        } catch (err) {
          console.error("Error parsing flow file:", err);
        }
      }
    };
    input.click();
  }, [setNodes, setEdges, setViewport, groupNode, ungroupNode]);

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
            <Controls style={{ width: "30px" }}>
              <ControlButton onClick={onSaveToFile}>
                <FontAwesomeIcon icon={faFileArrowDown} />
              </ControlButton>
              <ControlButton onClick={onRestoreFromFile}>
                <FontAwesomeIcon icon={faFileArrowUp} />
              </ControlButton>
            </Controls>
          </ReactFlow>
        </div>
      </Container>
    </ReactFlowProvider>
  );
};

export default FlowArea;
