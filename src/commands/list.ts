import { cancel, confirm, intro, isCancel, log, select } from "@clack/prompts";
import { command } from "cleye";
import color from "picocolors";

import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";
import { delay } from "../lib/delay";
import { formatTaskWithPrefix } from "../lib/formatters";
import { completeTask } from "../modules/complete-task";
import { removeTask } from "../modules/remove-task";

const PROMPT_TITLE = "To-Do List";

export default command(cliConfig.commands.list, async (argv) => {
  if (!argv.flags.interactive) {
    const tasks = tasksQueries.getAllTasks();

    if (tasks.length === 0) {
      log.success("No tasks remaining. All caught up!");
      return;
    }

    intro(`${color.bold(PROMPT_TITLE)}`);

    log.message(tasks.map((task) => formatTaskWithPrefix(task)).join("\n"));

    return;
  }

  intro(`${color.bold(PROMPT_TITLE)}`);

  while (true) {
    const tasks = tasksQueries.getAllTasks();

    if (tasks.length === 0) {
      log.info("No tasks remaining. All caught up!");
      return;
    }

    const selectedTaskId = await select({
      message: "Select a task to manage:",
      options: tasks.map((task) => ({
        label: formatTaskWithPrefix(task, true),
        value: task.id,
      })),
    });

    if (isCancel(selectedTaskId)) {
      cancel("Operation cancelled.");
      return;
    }

    const task = tasks.find((t) => t.id === selectedTaskId);

    if (!task) {
      log.error("Task not found.");
      continue;
    }

    const action = await select({
      message: `What do you want to do with "${task.title}"?`,
      options: [
        { label: "Complete Task", value: "complete" },
        { label: "Delete Task", value: "delete" },
        { label: "Go Back", value: "back" },
      ],
    });

    if (isCancel(action) || action === "back") continue;

    if (action === "complete") {
      if (task.completed_at) {
        log.info("Task is already completed.");
      } else {
        completeTask(task.id);
        await delay();
      }
    }

    if (action === "delete") {
      const confirmation = await confirm({
        message: `Are you sure you want to delete "${task.title}"?`,
      });

      if (confirmation) {
        removeTask(task.id);
      } else {
        log.info("Task deletion cancelled.");
      }
    }
  }
});
