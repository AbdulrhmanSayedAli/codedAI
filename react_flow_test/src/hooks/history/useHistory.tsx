import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Edge, Node } from "reactflow";
import { EdgeData, NodeData } from "../../Utils/Types";
import { popArray } from "../../Utils/Utils";

const useHistory = (
  setNodesState: Dispatch<SetStateAction<Node<NodeData>[]>>,
  setEdgesState: Dispatch<SetStateAction<Edge<EdgeData>[]>>
) => {
  const [undoStates, setUndoStates] = useState([]);
  const [redoStates, setRedoStates] = useState([]);

  const saveState = useCallback(
    (nodes: Node<NodeData>[], edges: Edge<EdgeData>[]) => {
      setRedoStates([]);
      let newStates = structuredClone(undoStates);
      if (newStates.length > 50) {
        newStates = newStates.slice(1, newStates.length);
      }
      setUndoStates([...newStates, { nodes: nodes, edges: edges }]);
    },
    [undoStates]
  );

  const undo = useCallback(() => {
    if (undoStates.length > 1) {
      const curState = undoStates[undoStates.length - 2];
      setRedoStates([...redoStates, undoStates[undoStates.length - 1]]);
      setUndoStates(popArray(undoStates));
      setNodesState(curState.nodes);
      setEdgesState(curState.edges);
    }
  }, [redoStates, setEdgesState, setNodesState, undoStates]);

  const redo = useCallback(() => {
    if (redoStates.length > 0) {
      const curState = redoStates[redoStates.length - 1];
      setUndoStates([...undoStates, redoStates[redoStates.length - 1]]);
      setRedoStates(popArray(redoStates));
      setNodesState(curState.nodes);
      setEdgesState(curState.edges);
    }
  }, [redoStates, setEdgesState, setNodesState, undoStates]);

  return {
    saveState,
    undo,
    redo,
  };
};

export default useHistory;
