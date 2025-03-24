import { confirm, intro, isCancel, log, outro } from "@clack/prompts";
import { command } from "cleye";
import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";

export default command(cliConfig.commands.purge, async () => {
  const archivedTasks = tasksQueries.getArchiveSummary();

  const totalTasks = tasksQueries.getTotalArchivedTasks();

  if (!totalTasks || totalTasks.count === 0) {
    log.warning("No archived tasks to purge.");
    return;
  }

  intro("Purge Archived Tasks");

  log.info(`Total Archived Tasks: ${totalTasks.count}`);

  for (const { tag, count } of archivedTasks) {
    log.info(`- ${tag || "Uncategorized"}: ${count} task(s)`);
  }

  const confirmation = await confirm({
    message: "Are you sure you want to permanently delete all archived tasks?",
  });

  if (!confirmation || isCancel(confirmation)) {
    log.error("Purge cancelled.");
    return;
  }

  tasksQueries.deleteArchivedTasks();

  outro("All archived tasks have been permanently deleted.");
});
