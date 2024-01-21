import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ConnectionMode,
  NodeChange,
  ConnectionLineType,
  MiniMap,
  Controls,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

import SimpleFloatingEdge from "./SimpleFloatingEdge";
import CustomNode from "./nodes/CustomNode";
import { useCustomReactFlowContext } from "./hooks/ReactFlow/customReactFlowContext";
import { NodeData } from "./Utils/Types";
import Svgs from "./assets/Svgs";
import EditPanel from "./Components/EditPanel/EditPanel";

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = () => {
  const {
    selectedNodes,
    selectedEdges,
    copiedNodes,
    copiedEdges,
    nodes,
    edges,
    getNode,
    getEdge,
    getGroupNodes,
    paste,
    setEdgesState,
    copy,
    onEdgesChange,
    onNodesChange,
    saveState,
    undo,
    redo,
    cancelEditting,
  } = useCustomReactFlowContext();

  const [MouseXY, setMouseXY] = useState({ x: null, y: null });

  const duplicate = useCallback(() => {
    paste(
      selectedNodes.map((nodeId) => getNode(nodeId)),
      selectedEdges.map((edgeId) => getEdge(edgeId))
    );
  }, [getEdge, getNode, paste, selectedEdges, selectedNodes]);

  const keyDownEvent = useCallback(
    (e: KeyboardEvent) => {
      const evtobj = e;
      if (evtobj.code == "KeyC" && evtobj.ctrlKey) copy();
      else if (evtobj.code == "KeyV" && evtobj.ctrlKey)
        paste(copiedNodes, copiedEdges);
      else if (evtobj.code == "KeyZ" && evtobj.ctrlKey && evtobj.shiftKey)
        redo();
      else if (evtobj.code == "KeyZ" && evtobj.ctrlKey) undo();
      else if (evtobj.code == "KeyY" && evtobj.ctrlKey) redo();
      else if (evtobj.code == "KeyD" && evtobj.ctrlKey) {
        duplicate();
        e.preventDefault();
      }
    },
    [copiedEdges, copiedNodes, copy, duplicate, paste, redo, undo]
  );

  useEffect(() => {
    document.onkeydown = keyDownEvent;
  }, [keyDownEvent]);

  useEffect(() => {
    saveState(nodes, edges);
  }, []);

  const handleSelectionChange = useCallback(
    (curNodes: Node<NodeData>[], isSelected: boolean) => {
      const changes = [];
      const groupNum = new Map<string, number>();
      for (const node of curNodes) {
        groupNum.set(node.data.group, (groupNum.get(node.data.group) | 0) + 1);
      }
      groupNum.forEach((value, key) => {
        const groupNodes = getGroupNodes(key);
        if (groupNodes.length === value) {
          for (const node of groupNodes) {
            changes.push({ id: node.id, type: "select", selected: isSelected });
          }
        }
      });
      return changes;
    },
    [getGroupNodes]
  );

  const onConnect = useCallback(
    (params) => {
      setEdgesState((eds) => {
        const newEdges = addEdge(
          {
            ...params,
            type: "floating",
            data: {
              markerEnd: "one",
            },
          },
          eds
        );

        saveState(nodes, newEdges);

        return newEdges;
      });
    },
    [nodes, saveState, setEdgesState]
  );

  const handleNodeChange = useCallback(
    (nodeChange: NodeChange) => {
      if (nodeChange.type === "position") {
        const changes: NodeChange[] = [];
        const nodeId = nodeChange.id;
        const currentNode = getNode(nodeId);

        if (nodeChange.position) {
          const Ydiff = nodeChange.position.y - currentNode.position.y;

          for (const node of getGroupNodes(currentNode.data.group)) {
            changes.push({
              id: node.id,
              type: "position",
              position: {
                x: nodeChange.position.x,
                y: node.position.y + Ydiff,
              },
              positionAbsolute: {
                x: nodeChange.position.x,
                y: node.position.y + Ydiff,
              },
              dragging: nodeChange.dragging,
            });
          }
        } else {
          for (const node of getGroupNodes(currentNode.data.group)) {
            changes.push({
              id: node.id,
              type: "position",
              dragging: nodeChange.dragging,
            });
          }
        }

        return changes;
      } else if (nodeChange.type === "select") return [];
      return [nodeChange];
    },
    [getGroupNodes, getNode]
  );
  return (
    <div className="simple-floatingedges">
      <Svgs />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes: NodeChange[]) => {
          const newChanges: NodeChange[] = [];
          const selectNodes = [];
          let isSelected = false;

          for (const nodeChange of changes) {
            newChanges.push(...handleNodeChange(nodeChange));
            if (nodeChange.type === "select") {
              isSelected = nodeChange.selected;
              selectNodes.push(getNode(nodeChange.id));
            }
          }

          newChanges.push(...handleSelectionChange(selectNodes, isSelected));
          onNodesChange(newChanges);
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
        connectionLineType={ConnectionLineType.SmoothStep}
        panOnDrag={[1, 2]}
        selectionOnDrag
        onClick={() => {
          cancelEditting();
        }}
        onSelectionDragStart={(event) => {
          setMouseXY({ x: event.screenX, y: event.screenY });
        }}
        onNodeDragStart={(event) => {
          setMouseXY({ x: event.screenX, y: event.screenY });
        }}
        onSelectionDragStop={(event) => {
          if (MouseXY.x === event.screenX && MouseXY.y === event.screenY)
            return;

          saveState(nodes, edges);
        }}
        onNodeDragStop={(event) => {
          if (MouseXY.x === event.screenX && MouseXY.y === event.screenY)
            return;
          saveState(nodes, edges);
        }}
      >
        <Background />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          zoomStep={2}
          position="top-left"
        />
        <Controls />
      </ReactFlow>
      <EditPanel />
    </div>
  );
};

export default NodeAsHandleFlow;
