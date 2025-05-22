"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { Button } from "./ui/button";


export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[250px] max-w-[340px] h-full border-r-2 border-separate p-2 px-4 overflow-auto">
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="extraction">
                <AccordionTrigger className="font-bold">
                    Data extraction
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
                    <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType];
    
    const onDragStart = (e: React.DragEvent<HTMLButtonElement>, type: TaskType) => {
        e.dataTransfer.setData("application/reactflow", type);
        e.dataTransfer.effectAllowed = "move";
    }

    return (
        <Button 
            variant="secondary" 
            className="flex justify-between items-center gap-2 border w-full"
            draggable
            onDragStart={(e) => onDragStart(e, taskType)}
        >
            <div className="flex items-center gap-2">
                <task.icon size={20} />
                {task.label}
            </div>
        </Button>
    )
}
