"use client";

import NodeComponent from "@/app/workflow/_components/nodes/NodeComponent";
import { Workflow } from "@/lib/generated/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  FitViewOptions,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  addEdge,
  getOutgoers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";
import DeletableEdge from "./edges/DeletableEdge";
import { isValid } from "zod";
import { TaskRegistry } from "@/lib/workflow/task/registry";
const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};
 
const snapGrid: [number, number] = [50, 50];
const fitViewOptions: FitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes);
      setEdges(flow.edges);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error(error);
    }
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (!taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    
    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, screenToFlowPosition]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({...connection, animated: true}, eds));
    if (!connection.targetHandle) return;
    const node = nodes.find((nd) => nd.id === connection.target);
    if (!node) return;  
    const nodeInputs = node.data.inputs;
    delete nodeInputs[connection.targetHandle];   
       updateNodeData(node.id, {inputs: nodeInputs});
  }, [setEdges, updateNodeData, nodes]);

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // No self connections
     if (connection.source === connection.target) return false;
    // Same taskParam type connection
    const sourceNode = nodes.find((nd) => nd.id === connection.source);
    const targetNode = nodes.find((nd) => nd.id === connection.target);
    if (!sourceNode || !targetNode) return false;

    const sourceTask = TaskRegistry[sourceNode.data.type];
    const targetTask = TaskRegistry[targetNode.data.type];

    const output = sourceTask.outputs.find((op) => op.name === connection.sourceHandle);
    const input = targetTask.inputs.find((ip) => ip.name === connection.targetHandle);

    if (output?.  type !== input?.type) {
      console.error("Invalid connection", output?.type, input?.type);
      return false;
    }

    const hasCycle = (node: AppNode, visited = new Set<string>()) => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    }

    const detectedCycle = hasCycle(targetNode);
    return !detectedCycle;

  }, [nodes, edges]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapGrid={snapGrid}
        snapToGrid
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={14} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
