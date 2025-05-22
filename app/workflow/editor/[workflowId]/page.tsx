import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "@/app/workflow/_components/Editor";

async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflowId = (await params).workflowId;
  const { userId } = await auth();

  if (!userId) return <div>Unauthorized</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
}

export default WorkflowEditorPage;
