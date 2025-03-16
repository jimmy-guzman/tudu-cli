import { log } from "@clack/prompts";

import { tasksQueries } from "../db/queries";
import { getNextDueDate } from "../lib/get-next-due-date";

export const completeTask = (id: number) => {
  const task = tasksQueries.getTaskById(id);

  if (task.completed_at) {
    log.warn(`Task ${id} is already completed.`);

    process.exit(0);
  }

  tasksQueries.markTaskAsCompleted(id);

  log.success(`Task ${id} marked as complete.`);

  if (task.repeat_rule) {
    const newDueDate = getNextDueDate(task.due_date, task.repeat_rule);

    tasksQueries.createTask({
      title: task.title,
      tag: task.tag,
      due_date: newDueDate,
      repeat_rule: task.repeat_rule,
      priority: task.priority,
    });

    log.info(
      `Recurring task re-added: "${task.title}" (Repeats: ${task.repeat_rule}, New Due: ${newDueDate || "N/A"})`,
    );
  }
};
