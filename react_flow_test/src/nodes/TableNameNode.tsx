import React from "react";
import { NodeData } from "../Utils/Types";

export default function TableNameNode({ data }: { data: NodeData }) {
  return <div className="table-name">{data.modelData.name}</div>;
}
