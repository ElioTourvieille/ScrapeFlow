import { Workflow } from "@/lib/generated/prisma";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import TopBar from "./topbar/TopBar";
import TaskMenu from "@/components/TaskMenu";
import { FlowValidationProvider } from "@/components/context/FlowValidationContext";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <FlowValidationProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopBar title="Workflow Editor" subtitle={workflow.name} workflowId={workflow.id} />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationProvider>
  );
}

export default Editor;
