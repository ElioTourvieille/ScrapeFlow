"use client";

import NodeComponent from "@/app/workflow/_components/nodes/NodeComponent";
import { Workflow } from "@/lib/generated/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/TaskType";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={14} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
