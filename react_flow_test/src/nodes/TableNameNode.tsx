import React from "react";
import { NodeData } from "../Utils/Types";
import { useCustomReactFlowContext } from "../hooks/ReactFlow/customReactFlowContext";

export default function TableNameNode({
  data,
  id,
}: {
  data: NodeData;
  id: string;
}) {
  const { editNode, getNode } = useCustomReactFlowContext();
  return (
    <div
      className="table-name"
      onClick={() => {
        setTimeout(() => {
          editNode(getNode(id));
        }, 30);
      }}
    >
      {data.modelData.name}
    </div>
  );
}
