import React from "react";
import { useCustomReactFlowContext } from "../../hooks/ReactFlow/customReactFlowContext";

export default function EditColumn() {
  const { currentEdittingNode } = useCustomReactFlowContext();
  return (
    <div className="edit-panel">
      <div>{`EditColumn: ${currentEdittingNode.data.label}`}</div>
    </div>
  );
  return;
}
