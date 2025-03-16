#!/usr/bin/env bun

import { cli } from "cleye";
import add from "../src/commands/add";
import archive from "../src/commands/archive";
import config from "../src/commands/config";
import done from "../src/commands/done";
import list from "../src/commands/list";
import purge from "../src/commands/purge";
import remove from "../src/commands/remove";
import restore from "../src/commands/restore";
import { cliConfig } from "../src/config/cli";

cli({
  name: cliConfig.name,
  commands: [add, archive, config, done, list, purge, remove, restore],
  help: cliConfig.help,
});
