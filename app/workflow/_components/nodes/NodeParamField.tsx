"use client"

import { TaskParam, TaskParamType } from "@/types/TaskType"
import StringParam from "./param/StringParam"
import { useReactFlow } from "@xyflow/react"
import { AppNode } from "@/types/appNode"
import { useCallback } from "react"

interface NodeParamFieldProps {
    param: TaskParam;
    nodeId: string;
}

function NodeParamField({ param, nodeId }: NodeParamFieldProps) {
    const {updateNodeData, getNode} = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name];

    const updateNodeParamValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: newValue
            }
        })
    }, [nodeId, param.name, updateNodeData, node?.data.inputs])
    switch (param.type) {
        case TaskParamType.STRING:
            return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />
        default:
            return (
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Not implemented</p>
                </div>
            )
    }
}

export default NodeParamField
