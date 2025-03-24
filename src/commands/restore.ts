import { log } from "@clack/prompts";
import { command } from "cleye";
import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";

export default command(cliConfig.commands.restore, async (argv) => {
  if (argv.flags.all) {
    const archivedTasks = tasksQueries.getArchivedTasks();

    if (archivedTasks.length === 0) {
      log.info("No archived tasks to restore.");
      return;
    }

    tasksQueries.unarchiveAllTasks();

    log.success(`Restored ${archivedTasks.length} archived task(s).`);

    return;
  }

  if (!argv._.id) {
    log.error("Please provide a task ID or use --all to restore everything.");

    return;
  }

  const id = Number(argv._.id);

  if (Number.isNaN(id)) {
    log.error("Invalid task ID. Please provide a valid number.");

    return;
  }

  const task = tasksQueries.getTaskById(id);

  if (!task) {
    log.error(`Task ${id} not found.`);

    return;
  }

  if (!task.archived_at) {
    log.error(`Task ${id} is not archived.`);

    return;
  }

  tasksQueries.unarchiveTaskById(id);

  log.success(`Restored task ${id}: "${task.title}"`);
});
