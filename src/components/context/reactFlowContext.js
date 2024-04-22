import { createContext, useContext, useState } from "react";
import { useNodesState, useOnSelectionChange } from "reactflow";

const ReactFlowContext = createContext(undefined);

export const useReactFlowContext = () => useContext(ReactFlowContext);

export const ReactFlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [selectedNode, setSelectedNode] = useState([]);
  const [selectedEdge, setSelectedEdge] = useState([]);

  const updateNodeAttributes = (nodeId, newAttributes) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          // Возвращаем новый объект узла с обновленными атрибутами
          return {
            ...node,
            data: {
              ...node.data,
              attributes: newAttributes,
            },
          };
        }
        return node; // Возвращаем узлы, которые не нужно обновлять без изменений
      })
    );
  };

  return (
    <ReactFlowContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        selectedNode,
        setSelectedNode,
        updateNodeAttributes,
      }}
    >
      {children}
    </ReactFlowContext.Provider>
  );
};
