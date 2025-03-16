import * as c from "picocolors";

import type { TaskPriorityType, TaskType } from "../schemas/task";

const priorityColors = {
  low: c.green,
  medium: c.yellow,
  high: c.red,
};

const formatDueDate = (dueDate?: string | null | undefined) => {
  const isOverdue = dueDate && new Date(dueDate) < new Date();

  return dueDate
    ? `(due: ${isOverdue ? c.red(`${dueDate}!`) : c.gray(dueDate)})`
    : "";
};

const formatPriority = (priority?: TaskPriorityType | null | undefined) => {
  return priority
    ? `(priority: ${c.bold(priorityColors[priority]?.(priority))})`
    : "";
};

const formatTaskMeta = (task: Partial<TaskType>) => {
  const metaParts = [
    formatDueDate(task.due_date),
    formatPriority(task.priority),
    task.repeat_rule ? `(repeats: ${task.repeat_rule})` : "",
    task.tag ? `[${c.cyan(task.tag)}]` : "",
  ];

  return metaParts.filter(Boolean).join(" ").trimStart();
};

export const formatTask = (task: Partial<TaskType>) => {
  return `${c.bold(task.title)} ${formatTaskMeta(task)}`.trimEnd();
};

export const formatTaskWithPrefix = (task: TaskType, interactive = false) => {
  const status = task.completed_at ? "[X]" : "[ ]";
  const id = interactive ? "" : `${task.id}.`;

  return `${status} ${id} ${formatTask(task)}`.trimEnd();
};
