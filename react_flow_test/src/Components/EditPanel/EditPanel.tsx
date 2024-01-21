import React from "react";
import "../../assets/styles/Components/edit_panel.css";
import { useCustomReactFlowContext } from "../../hooks/ReactFlow/customReactFlowContext";
import EditColumn from "./EditColumn";
import EditModel from "./EditModel";
import EditEdge from "./Editedge";

export default function EditPanel() {
  const { currentEdittingNode, currentEdittingEdge } =
    useCustomReactFlowContext();
  return (
    <div className="edit-panel-container">
      {currentEdittingNode ? (
        currentEdittingNode.data.topInGroup ? (
          <EditModel />
        ) : (
          <EditColumn />
        )
      ) : currentEdittingEdge ? (
        <EditEdge />
      ) : (
        ""
      )}
    </div>
  );
}
