import { command } from "cleye";
import { cliConfig } from "../config/cli";
import { completeTask } from "../modules/complete-task";

export default command(cliConfig.commands.done, async (argv) => {
  const id = Number.parseInt(argv._.id);

  completeTask(id);
});
