import { log } from "@clack/prompts";
import { command } from "cleye";
import { cliConfig } from "../config/cli";
import store from "../store";

export default command(cliConfig.commands.config, async (argv) => {
  if (argv._.key === "path") {
    log.info(`SQLite Database Path: ${store.get("path")}`);
  }
});
