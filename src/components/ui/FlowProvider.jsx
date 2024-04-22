import React from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import FlowArea from "./FlowArea";

function FlowProvider(props) {
  return (
    <ReactFlowProvider>
      <FlowArea {...props} />
    </ReactFlowProvider>
  );
}

export default FlowProvider;
