import { command } from "cleye";

import { confirm, isCancel, log, outro } from "@clack/prompts";
import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";

export default command(cliConfig.commands.remove, async (argv) => {
  const id = Number.parseInt(argv._.id);

  const task = tasksQueries.getTaskById(id);

  if (!task) {
    throw new Error(`Task ${id} not found.`);
  }

  const confirmation = await confirm({
    message: `Are you sure you want to delete "${task.title}"?`,
  });

  if (!confirmation || isCancel(confirmation)) {
    log.error("Purge cancelled.");

    return;
  }

  tasksQueries.deleteTaskById(id);

  outro(`Task ${id} has been removed.`);
});
