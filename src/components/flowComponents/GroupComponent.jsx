import React from "react";
import { NodeResizer, Handle, Position, NodeToolbar } from "reactflow";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CustomNodeComponent = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={250}
        color="#ff0071"
      />
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <div>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              data.actions.delete();
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </NodeToolbar>
      <Handle
        id="l"
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        id="b"
        type="target"
        position={Position.Bottom}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <Handle
        id="t"
        type="source"
        position={Position.Top}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        id="r"
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="rectangleComponent">
        <div>
          <strong>{data.label}</strong>
        </div>
      </div>
    </>
  );
};

export default CustomNodeComponent;
