"use client"

import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { useReactFlow } from "@xyflow/react"
import { useMutation } from "@tanstack/react-query"
import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow"
import { toast } from "sonner"

export default function SaveBtn({ workflowId }: { workflowId: string }) {
    const {toObject} = useReactFlow()

    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Workflow saved", { id: "save-workflow" })
        },
        onError: () => {
            toast.error("Failed to save workflow", { id: "save-workflow" })
        }
    })

    return (
        <Button 
            disabled={saveMutation.isPending}
            variant="outline" 
            className="flex items-center gap-2 font-bold"
            onClick={() => {
                const workflowDefinition = JSON.stringify(toObject())
                toast.loading("Saving workflow...", { id: "save-workflow" })
                saveMutation.mutate({ id: workflowId, definition: workflowDefinition })
            }}
        >
            <CheckIcon size={16} className="stroke-green-600" />
            Save
        </Button>
    )
}