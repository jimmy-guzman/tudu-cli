import { log } from "@clack/prompts";
import { command } from "cleye";

import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";

export default command(cliConfig.commands.archive, async () => {
  const completedTasks = tasksQueries.getCompletedTasks();

  if (completedTasks.length === 0) {
    log.info("No completed tasks to archive.");
    return;
  }

  for (const task of completedTasks) {
    tasksQueries.archiveTaskById(task.id);
  }

  log.success(`Archived ${completedTasks.length} completed task(s).`);
});
