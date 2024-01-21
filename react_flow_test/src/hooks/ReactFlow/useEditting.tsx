import { useCallback, useState } from "react";
import { Edge, Node } from "reactflow";
import { EdgeData, NodeData } from "../../Utils/Types";

const useEditting = () => {
  const [currentEdittingNode, setCurrentEdittingNode] = useState(null);
  const [currentEdittingEdge, setCurrentEdittingEdge] = useState(null);

  const editNode = useCallback((node: Node<NodeData>) => {
    setCurrentEdittingEdge(null);
    setCurrentEdittingNode(node);
  }, []);

  const editEdge = useCallback((edge: Edge<EdgeData>) => {
    setCurrentEdittingEdge(edge);
    setCurrentEdittingNode(null);
  }, []);

  const cancelEditting = useCallback(() => {
    setCurrentEdittingEdge(null);
    setCurrentEdittingNode(null);
  }, []);

  return {
    currentEdittingNode,
    currentEdittingEdge,
    editNode,
    editEdge,
    cancelEditting,
  };
};

export default useEditting;
