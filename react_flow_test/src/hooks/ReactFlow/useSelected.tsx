import { useState } from "react";
import { useOnSelectionChange } from "reactflow";

const useSelected = () => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
    },
  });

  return { selectedNodes, selectedEdges };
};

export default useSelected;
