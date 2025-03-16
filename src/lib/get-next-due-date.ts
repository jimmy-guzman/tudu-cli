import type { TaskRepeatRuleType } from "../schemas/task";

export function getNextDueDate(
  dueDate: string | null,
  repeat: TaskRepeatRuleType,
) {
  if (!dueDate) return null;

  const currentDate = new Date(dueDate);

  if (Number.isNaN(currentDate.getTime())) return null;

  switch (repeat) {
    case "daily":
      currentDate.setDate(currentDate.getDate() + 1);
      break;
    case "weekly":
      currentDate.setDate(currentDate.getDate() + 7);
      break;
    case "monthly":
      currentDate.setMonth(currentDate.getMonth() + 1);

      break;
  }

  return currentDate.toISOString().split("T")[0];
}
