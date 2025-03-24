import { log } from "@clack/prompts";

import { tasksQueries } from "../db/queries";

export const removeTask = (id: number) => {
  const task = tasksQueries.getTaskById(id);

  if (!task) {
    log.error(`Task ${id} not found.`);

    process.exit(1);
  }

  tasksQueries.deleteTaskById(id);

  log.success(`Task ${id} has been removed.`);
};
