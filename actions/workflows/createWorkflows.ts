"use server";

import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid fields");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  revalidatePath("/workflows");
  return { id: result.id };
}
