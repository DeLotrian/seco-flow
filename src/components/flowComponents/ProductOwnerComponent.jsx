import React from "react";
import { NodeResizer, Handle, Position, NodeToolbar } from "reactflow";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faObjectGroup,
  faObjectUngroup,
} from "@fortawesome/free-solid-svg-icons";

const CustomNodeComponent = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={150}
        minHeight={50}
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
          <Button
            size="sm"
            variant="primary"
            style={{
              display:
                data.readyToGroup && !data.isGrouped ? "inline-block" : "none",
              marginLeft: "5px",
            }}
            onClick={() => {
              data.actions.group(data.possibleParentId);
            }}
          >
            <FontAwesomeIcon icon={faObjectGroup} />
          </Button>
          <Button
            size="sm"
            variant="warning"
            style={{
              display: data.isGrouped ? "inline-block" : "none",
              marginLeft: "5px",
            }}
            onClick={() => {
              data.actions.ungroup();
            }}
          >
            <FontAwesomeIcon icon={faObjectUngroup} />
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
