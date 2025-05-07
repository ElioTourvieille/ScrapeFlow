import { TaskType } from "@/types/TaskType";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-700" {...props} />
  ),
  isEntryPoint: true,
};
