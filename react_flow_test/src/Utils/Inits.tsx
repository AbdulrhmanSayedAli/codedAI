import { Edge, Node } from "reactflow";
import { EdgeData, NodeData } from "./Types";

export const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "id",
      group: "1",
      topInGroup: true,
      groupIndex: 0,
      modelData: {
        name: "User",
      },
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 0, y: 40 },
    data: { label: "id", group: "1", groupIndex: 1 },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 0, y: 80 },
    data: { label: "user_name", group: "1", groupIndex: 2 },
    type: "custom",
  },

  {
    id: "4",
    position: { x: 0, y: 120 },
    data: {
      label: "email",
      group: "1",
      bottomInGroup: true,
      groupIndex: 3,
    },
    type: "custom",
  },

  {
    id: "5",
    position: { x: 0, y: 150 },
    data: {
      group: "2",
      topInGroup: true,
      groupIndex: 0,
      modelData: {
        name: "Car",
      },
    },
    type: "custom",
  },
  {
    id: "6",
    position: { x: 0, y: 190 },
    data: {
      label: "id",
      group: "2",
      groupIndex: 1,
      bottomInGroup: true,
    },
    type: "custom",
  },
];

export const initialEdges: Edge<EdgeData>[] = [
  {
    id: "3-6",
    source: "3",
    target: "6",
    type: "floating",
    data: {
      markerEnd: "many",
      markerStart: "one",
    },
  },
];
