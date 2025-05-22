import { TaskParamType, TaskType } from "@/types/task";
import { LucideProps, TextIcon } from "lucide-react";
import { WorkflowTask } from "@/types/workflow";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract Text from Element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-700" {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamType.STRING,
    },
  ],
} satisfies WorkflowTask;
