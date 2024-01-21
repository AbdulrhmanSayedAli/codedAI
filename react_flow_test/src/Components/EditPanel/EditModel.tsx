import React from "react";
import { useCustomReactFlowContext } from "../../hooks/ReactFlow/customReactFlowContext";

export default function EditModel() {
  const { currentEdittingNode } = useCustomReactFlowContext();
  return (
    <div className="edit-panel">
      <div>{`EditModel: ${currentEdittingNode.data.modelData.name}`}</div>
    </div>
  );
}
