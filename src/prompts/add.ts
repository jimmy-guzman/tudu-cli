import { cancel, isCancel, select, text } from "@clack/prompts";

import { inputValidator } from "../lib/input-validator";
import {
  TaskDueDateSchema,
  type TaskPriorityType,
  type TaskRepeatRuleType,
  TaskTitleSchema,
} from "../schemas/task";

export const titlePrompt = async () => {
  const response = await text({
    message: "What is the task?",
    placeholder: "Write blog post",
    validate: inputValidator(TaskTitleSchema),
  });

  if (isCancel(response)) {
    cancel("Task creation cancelled.");

    process.exit(0);
  }

  return response;
};

export const dueDatePrompt = async () => {
  const response = await text({
    message: "Enter a due date (YYYY-MM-DD) (optional)",
    placeholder: "2025-03-15",
    validate: inputValidator(TaskDueDateSchema),
  });

  if (isCancel(response)) return undefined;

  return response;
};

export const priorityPrompt = async () => {
  const response = await select<TaskPriorityType>({
    message: "Set priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    initialValue: "medium",
  });

  if (isCancel(response)) return "medium";

  return response;
};

export const repeatRulePrompt = async () => {
  const response = await select<TaskRepeatRuleType | undefined>({
    message: "Repeat task?",
    options: [
      { label: "None", value: undefined },
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
    ],
  });

  if (isCancel(response)) return undefined;

  return response;
};

export const tagPrompt = async () => {
  const response = await text({
    message: "Enter a tag (optional)",
    placeholder: "work, personal, etc.",
  });

  if (isCancel(response)) return undefined;

  return response;
};
