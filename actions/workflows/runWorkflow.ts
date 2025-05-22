"use server"

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { WorkflowExecutionPlan } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function RunWorkflow(form:{
    workflowId: string,
    flowDefinition?: string,
}) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const { workflowId, flowDefinition } = await form;
    if (!workflowId) {
        throw new Error("Workflow ID is required");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    });

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    let executionPlan: WorkflowExecutionPlan;
    if (!flowDefinition) {
        throw new Error("Flow definition is not defined");
    } 
    
    const flow = JSON.parse(flowDefinition);

    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
        throw new Error("Invalid flow definition");
    }

    if (!result.executionPlan) {
        throw new Error("No execution plan generated");
    }

    executionPlan = result.executionPlan;
    console.log("ExecutionPlan", executionPlan);
            
}

