import { Node } from "@xyflow/react";
import { TaskType } from "./TaskType";

export interface AppNodeData {
  [key: string]: any;
  type: TaskType;
  inputs: Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
