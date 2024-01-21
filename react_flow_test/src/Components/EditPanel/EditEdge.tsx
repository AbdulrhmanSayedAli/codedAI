import React from "react";
import { useCustomReactFlowContext } from "../../hooks/ReactFlow/customReactFlowContext";

export default function EditEdge() {
  const { currentEdittingEdge } = useCustomReactFlowContext();
  return (
    <div className="edit-panel">
      <div>{`EditEdge: ${currentEdittingEdge.id}`}</div>
    </div>
  );
}
