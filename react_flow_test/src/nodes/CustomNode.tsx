import React, { useCallback } from "react";
import { useCustomReactFlowContext } from "../hooks/ReactFlow/customReactFlowContext";
import RegularNode from "./RegularNode";
import { NODE_HEIGHT } from "../Utils/Constants";
import { randomString } from "../Utils/Utils";
import TableNameNode from "./TableNameNode";

export default function CustomNode(params) {
  const { data, xPos, yPos } = params;
  const {
    getGroupNodes,
    setNodesState,
    nodes,
    edges,
    saveState,
    generateNode,
    editNode,
    getNode,
  } = useCustomReactFlowContext();

  const addNode = useCallback(() => {
    const groupNodes = getGroupNodes(data.group);
    const newNodes = [];
    const newNodeId = randomString(6);
    for (const node of groupNodes) {
      if (node.data.groupIndex <= data.groupIndex) newNodes.push(node);
    }
    newNodes.push(generateNode(newNodeId, xPos, yPos, data));
    for (const node of groupNodes) {
      if (node.data.groupIndex > data.groupIndex) {
        const curNode = structuredClone(node);
        curNode.position.y += NODE_HEIGHT;
        curNode.data.groupIndex++;
        newNodes.push(curNode);
      }
    }

    newNodes.sort((a, b) => a.data.groupIndex - b.data.groupIndex);
    for (const node of newNodes) {
      node.data.bottomInGroup = false;
      node.data.topInGroup = false;
    }

    if (newNodes.length > 0) {
      newNodes[newNodes.length - 1].data.bottomInGroup = true;
      newNodes[0].data.topInGroup = true;
    }
    for (const node of nodes) {
      if (node.data.group !== data.group) newNodes.push(node);
    }
    setNodesState(newNodes);
    saveState(newNodes, edges);
    setTimeout(() => {
      editNode(getNode(newNodeId));
    }, 60);
  }, [
    getGroupNodes,
    data,
    generateNode,
    xPos,
    yPos,
    setNodesState,
    saveState,
    edges,
    editNode,
    getNode,
    nodes,
  ]);

  const deleteNode = useCallback(() => {
    if (data.groupIndex === 1) return;
    const newNodes = [];
    const groupNodes = getGroupNodes(data.group);

    for (const node of groupNodes) {
      if (node.data.groupIndex < data.groupIndex) newNodes.push(node);
    }

    for (const node of groupNodes) {
      if (node.data.groupIndex > data.groupIndex) {
        const curNode = structuredClone(node);
        curNode.position.y -= NODE_HEIGHT;
        curNode.data.groupIndex--;
        newNodes.push(curNode);
      }
    }

    newNodes.sort((a, b) => a.data.groupIndex - b.data.groupIndex);
    for (const node of newNodes) {
      node.data.bottomInGroup = false;
      node.data.topInGroup = false;
    }

    if (newNodes.length > 0) {
      newNodes[newNodes.length - 1].data.bottomInGroup = true;
      newNodes[0].data.topInGroup = true;
    }
    for (const node of nodes) {
      if (node.data.group !== data.group) newNodes.push(node);
    }
    setNodesState(newNodes);
    saveState(newNodes, edges);
  }, [
    getGroupNodes,
    data.group,
    data.groupIndex,
    setNodesState,
    saveState,
    nodes,
    edges,
  ]);

  return (
    <>
      {data.topInGroup ? (
        <TableNameNode {...params} />
      ) : (
        <RegularNode {...params} addNode={addNode} deleteNode={deleteNode} />
      )}
    </>
  );
}
