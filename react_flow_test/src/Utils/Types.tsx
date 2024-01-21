import { Dispatch, SetStateAction } from "react";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowInstance,
} from "reactflow";
import {
  EDGE_MARKER_OPTIONS,
  ON_DELETE_OPTIONS,
  VALID_COLUMN_TYPES,
} from "./Constants";

export type onDelete = (typeof ON_DELETE_OPTIONS)[number];
export type ColumType = (typeof VALID_COLUMN_TYPES)[number];

export type ColumnDataProperties = {
  null: boolean;
  blank: boolean;
  unique: boolean;
  default: string | number;
  max_length: number;
  editable: boolean;
  db_column: string;
  choices: string[] | number[];
  max_digits: number;
  decimal_places: number;
  help_text: string;
  auto_now_add: boolean;
  auto_now: boolean;
  autoincrement: boolean;
  serialize: boolean;
  related_name: string;
  primary_key: boolean;
};

export type ColumnData = {
  name: string;
  type: ColumType;
  foreign_key: {
    to: string;
    on_delete: onDelete;
  };
  one_to_one: {
    to: string;
    on_delete: onDelete;
  };
  many_to_many: {
    to: string;
  };
  properties: ColumnDataProperties;
};

export type ModelDataMeta = {
  db_table: string;
  ordering: string;
  verbose_name: string;
  verbose_name_plural: string;
  abstract: boolean;
};

export type ModelData = {
  name: string;
  timestambed?: boolean;
  isuser?: boolean;
  soft_delete?: boolean;
  meta?: ModelDataMeta;
};

export type NodeData = {
  label?: string;
  group: string;
  groupIndex: number;
  topInGroup?: boolean;
  bottomInGroup?: boolean;
  columnData?: ColumnData;
  modelData?: ModelData;
};

export type EdgeData = {
  markerStart?: (typeof EDGE_MARKER_OPTIONS)[number];
  markerEnd?: (typeof EDGE_MARKER_OPTIONS)[number];
};

export type CustomReactFlowInstance = ReactFlowInstance & {
  selectedNodes: string[];
  selectedEdges: string[];
  copiedNodes: Node<NodeData>[];
  copiedEdges: Edge<EdgeData>[];
  currentEdittingNode: Node<NodeData>;
  currentEdittingEdge: Edge<EdgeData>;
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
  getGroupNodes: (id: string) => Node<NodeData>[];
  copy: () => void;
  paste: (copiedNodes: Node<NodeData>[], copiedEdges: Edge<EdgeData>[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setNodesState: Dispatch<SetStateAction<Node<NodeData>[]>>;
  setEdgesState: Dispatch<SetStateAction<Edge<EdgeData>[]>>;
  saveState: (nodes: Node<NodeData>[], edges: Edge<EdgeData>[]) => void;
  undo: () => void;
  redo: () => void;
  generateNode: (
    id: string,
    parentX: number,
    parentY: number,
    parentData: NodeData
  ) => Node<NodeData>;
  editNode: (node: Node<NodeData>) => void;
  editEdge: (edge: Edge<EdgeData>) => void;
  cancelEditting: () => void;
};
