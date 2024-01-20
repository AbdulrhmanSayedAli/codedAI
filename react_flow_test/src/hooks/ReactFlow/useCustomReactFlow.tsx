import { useCallback } from "react";
import {
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { CustomReactFlowInstance, EdgeData, NodeData } from "../../Utils/Types";
import { randomString } from "../../Utils/Utils";
import { initialEdges, initialNodes } from "../../Utils/Inits";
import useHistory from "../history/useHistory";
import useSelected from "./useSelected";
import useCopied from "./useCopied";
import { NODE_HEIGHT, NODE_WIDTH } from "../../Utils/Constants";

const useCustomReactFlow = (): CustomReactFlowInstance => {
  const { selectedNodes, selectedEdges } = useSelected();
  const reactFlowInstance = useReactFlow<NodeData>();
  const [nodes, setNodesState, onNodesChange] =
    useNodesState<NodeData>(initialNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(initialEdges);
  const { saveState, undo, redo } = useHistory(setNodesState, setEdgesState);
  const { copiedNodes, copiedEdges, copy } = useCopied(
    selectedNodes,
    selectedEdges,
    reactFlowInstance.getNode,
    reactFlowInstance.getEdge
  );

  const getGroupNodes = useCallback(
    (id: string) => {
      return structuredClone(nodes.filter((val) => val.data.group === id));
    },
    [nodes]
  );

  const paste = useCallback(
    (copiedNodes: Node<NodeData>[], copiedEdges: Edge<EdgeData>[]) => {
      const hash = randomString(10);
      const newNodes = copiedNodes.map((curnode) => {
        const node = structuredClone(curnode);

        node.id = "cpOf" + node.id + hash;
        node.data.group += "cpOf" + node.data.group + hash;
        node.position.x += 50;
        return node;
      });

      const newEdges = copiedEdges.map((edge) => {
        const nedge = structuredClone(edge);

        nedge.id = "cpOf" + nedge.id + hash;
        nedge.source = "cpOf" + nedge.source + hash;
        nedge.target = "cpOf" + nedge.target + hash;
        return nedge;
      });

      const finalNodes = [
        ...nodes.map((node) => {
          node.selected = false;
          return node;
        }),
        ...newNodes.map((node) => {
          node.selected = true;
          return node;
        }),
      ];
      const finalEdges = [
        ...edges.map((edge) => {
          edge.selected = false;
          return edge;
        }),
        ...newEdges.map((edge) => {
          edge.selected = true;
          return edge;
        }),
      ];
      saveState(finalNodes, finalEdges);
      reactFlowInstance.setNodes(finalNodes);
      reactFlowInstance.setEdges(finalEdges);
    },
    [edges, nodes, reactFlowInstance, saveState]
  );

  const generateNode = (
    id: string,
    parentX: number,
    parentY: number,
    parentData: NodeData
  ) => {
    const result = {
      id: id,
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
      position: { x: parentX, y: parentY + NODE_HEIGHT },
      data: structuredClone(parentData),
      type: "custom",
    };
    result.data.label = "new_column";
    result.data.groupIndex++;

    return result;
  };

  return {
    ...reactFlowInstance,
    getGroupNodes,
    copy,
    paste,
    onNodesChange,
    onEdgesChange,
    setNodesState,
    setEdgesState,
    saveState,
    undo,
    redo,
    generateNode,
    selectedNodes,
    selectedEdges,
    copiedNodes,
    copiedEdges,
    nodes,
    edges,
  };
};

export default useCustomReactFlow;
