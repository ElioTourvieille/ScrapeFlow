import { AppNode, AppNodeMissingInputs } from "@/types/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError {
    "NO_ENTRY_POINT",
    "INVALID_INPUTS",
}

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan;
    error?:{
        type: FlowToExecutionPlanValidationError;
        invalidElements?: AppNodeMissingInputs[];
    }
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {

    const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint);

    if (!entryPoint) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
            }
        }
    }

    const inputsWithErrors: AppNodeMissingInputs[] = [];
    const planned = new Set<string>();

    const invalidInputs = getInvalidInputs(entryPoint, planned, edges);
    if (invalidInputs.length > 0) {
        inputsWithErrors.push({
            nodeId: entryPoint.id,
            inputs: invalidInputs,
        });
    }

    const executionPlan: WorkflowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint],
        }
    ];

    planned.add(entryPoint.id);

    for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
        const nextPhase: WorkflowExecutionPlanPhase = {
            phase,
            nodes: [],
        };

        for (const currentNode of nodes) {
            if (planned.has(currentNode.id)) {
                // Node already put in the execution plan
                continue;
            }

            const invalidInputs = getInvalidInputs(currentNode, planned, edges);
            if (invalidInputs.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every((incomer) => planned.has(incomer.id))) {
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        inputs: invalidInputs,
                    });
                }
                else {
                    // Node has invalid inputs, but not all incomers are planned
                    // We need to wait for the incomers to be planned
                    continue;
                }
            }
            
            nextPhase.nodes.push(currentNode);
        }
        for (const node of nextPhase.nodes) {
            planned.add(node.id);
        }
        executionPlan.push(nextPhase);
    }

    if (inputsWithErrors.length > 0) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                invalidElements: inputsWithErrors,
            }
        }
    }

    return { executionPlan };
}

function getInvalidInputs(node: AppNode, planned: Set<string>, edges: Edge[]) {
    const invalidInputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length > 0;
        if (inputValueProvided) {
            // Input value provided, so we don't need to check the input node
            continue;
        }

        const incomingEdges = edges.filter((edge) => edge.target === node.id);
        const inputLinkedToOutput = incomingEdges.find((edge) => edge.targetHandle === input.name);
        
        const requiredInputProvidedByVisitedOutput = 
            input.required && 
            inputLinkedToOutput &&   
            planned.has(inputLinkedToOutput.source);

        if (requiredInputProvidedByVisitedOutput) {
            // Input value is provided by a visited output, so we don't need to check the input node
            continue;
        } else if (!input.required) {
            // Input is not required, so we don't need to check the input node
            if (!inputLinkedToOutput) continue;
            if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) continue;
        }
 
        invalidInputs.push(input.name);
    }

    return invalidInputs;
}