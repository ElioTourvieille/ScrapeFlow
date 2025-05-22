"use client"

import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { useMutation } from '@tanstack/react-query';
import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { toast } from 'sonner';

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution"});
    },
    onError: () => {
      toast.error("Failed to execute workflow", { id: "flow-execution"});
    }
  })

  return (
    <Button 
        className='flex items-center gap-2'
        variant={"outline"}
        onClick={() => {
          const plan = generate();

        }}
    >
        <PlayIcon size={16} className='stroke-orange-500' />
        Execute
    </Button>
  )
}

