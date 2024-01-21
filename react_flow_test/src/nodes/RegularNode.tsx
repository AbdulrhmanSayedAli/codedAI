import React, { useCallback, useState } from "react";
import { useCustomReactFlowContext } from "../hooks/ReactFlow/customReactFlowContext";
import { Handle, Position, useStore } from "reactflow";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default function RegularNode({ data, id, addNode, deleteNode }) {
  const [isEditing, setEditing] = useState(false);
  const { getNode, nodes, edges, setNodesState, saveState, editNode } =
    useCustomReactFlowContext();

  const handleClassName = `node-handle ${data.topInGroup ? "visible" : ""}`;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  const isTarget =
    connectionNodeId && getNode(connectionNodeId).data.group !== data.group;
  const borderRadius = "5px";

  const editLabel = useCallback(
    (text: string) => {
      const newNodes = structuredClone(nodes);
      for (const node of newNodes)
        if (node.id === id) {
          node.data.label = text;
          break;
        }
      setNodesState(newNodes);
      saveState(newNodes, edges);
    },
    [edges, id, nodes, saveState, setNodesState]
  );

  return (
    <div
      onClick={() => {
        setTimeout(() => {
          editNode(getNode(id));
        }, 30);
      }}
      className="node-content"
      style={{
        backgroundColor: isTarget ? "#ffcce3" : "#ffffff",
        borderBottom: data.bottomInGroup ? "" : "none",
        borderTopLeftRadius: data.groupIndex === 1 ? borderRadius : "",
        borderTopRightRadius: data.groupIndex === 1 ? borderRadius : "",
        borderBottomRightRadius: data.bottomInGroup ? borderRadius : "",
        borderBottomLeftRadius: data.bottomInGroup ? borderRadius : "",
      }}
    >
      <div className="add-button nodrag nopan" onClick={addNode}>
        <ExpandCircleDownIcon fontSize="medium"></ExpandCircleDownIcon>
      </div>
      <div className="delete-button nodrag nopan" onClick={deleteNode}>
        <RemoveCircleIcon fontSize="medium"></RemoveCircleIcon>
      </div>
      <div className="node-body">
        {!isConnecting && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              id="a"
              className={handleClassName}
            />
            <Handle
              type="source"
              position={Position.Left}
              id="b"
              className={handleClassName}
            />
          </>
        )}

        <Handle
          className="customHandle"
          position={Position.Top}
          type="target"
          isConnectableStart={isTarget}
          isConnectableEnd={isTarget}
        />

        {isEditing ? (
          <input
            className="node-label"
            type="text"
            value={data.label}
            onChange={(e) => {
              editLabel(e.target.value);
            }}
            onBlur={() => {
              setEditing(false);
            }}
            autoFocus
          />
        ) : (
          <div
            className="node-label"
            onClick={() => {
              setEditing(true);
            }}
          >
            {data.label}
          </div>
        )}
      </div>
    </div>
  );
}
