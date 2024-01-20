import { useCallback } from "react";
import { useStore, getSmoothStepPath, Position } from "reactflow";

import { getEdgeParams } from "./Utils/Utils.js";
import { EdgeData } from "./Utils/Types.js";

function SimpleFloatingEdge({
  id,
  source,
  target,
  style,
  data,
}: {
  id;
  source;
  target;
  markerEnd?;
  style?;
  data?: EdgeData;
}) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={5}
        markerEnd={
          targetPos === Position.Right
            ? `url(#${data.markerEnd}-right)`
            : `url(#${data.markerEnd}-left)`
        }
        markerStart={
          targetPos === Position.Right
            ? `url(#${data.markerStart}-right)`
            : `url(#${data.markerStart}-left)`
        }
        style={style}
      />
    </>
  );
}

export default SimpleFloatingEdge;
