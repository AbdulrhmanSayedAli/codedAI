import { useCallback, useState } from "react";
import { Edge, Node } from "reactflow";
import { NodeData } from "../../Utils/Types";

const useCopied = (
  selectedNodes: string[],
  selectedEdges: string[],
  getNode: (id: string) => Node<NodeData>,
  getEdge: (id: string) => Edge
) => {
  const [copiedNodes, setCopiedNodes] = useState([]);
  const [copiedEdges, setCopiedEdges] = useState([]);

  const copy = useCallback(() => {
    setCopiedNodes(
      selectedNodes.map((nodeId) => structuredClone(getNode(nodeId)))
    );
    setCopiedEdges(
      selectedEdges.map((edgeId) => structuredClone(getEdge(edgeId)))
    );
  }, [getEdge, getNode, selectedEdges, selectedNodes]);

  return { copiedNodes, copiedEdges, copy };
};

export default useCopied;
