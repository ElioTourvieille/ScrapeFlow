"use client"

import { TaskParam, TaskParamType } from "@/types/task"
import StringParam from "./param/StringParam"
import { useReactFlow } from "@xyflow/react"
import { AppNode } from "@/types/appNode"
import { useCallback } from "react"
import BrowserInstanceParam from "./param/BrowserInstanceParam"

interface NodeParamFieldProps {
    param: TaskParam;
    nodeId: string;
    disabled?: boolean;
}

function NodeParamField({ param, nodeId, disabled }: NodeParamFieldProps) {
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
            return (
                <StringParam 
                    param={param} 
                    value={value} 
                    updateNodeParamValue={updateNodeParamValue} 
                    disabled={disabled} 
                />
            )
        case TaskParamType.BROWSER_INSTANCE:
            return (
                <BrowserInstanceParam 
                    param={param} 
                    value={""} 
                    updateNodeParamValue={updateNodeParamValue} 
                />
            )
        default:
            return (
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Not implemented</p>
                </div>
            )
    }
}

export default NodeParamField
