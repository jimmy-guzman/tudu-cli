import { log, outro } from "@clack/prompts";
import { command } from "cleye";
import * as v from "valibot";

import { cliConfig } from "../config/cli";
import { tasksQueries } from "../db/queries";
import { formatTask } from "../lib/formatters";
import {
  dueDatePrompt,
  priorityPrompt,
  repeatRulePrompt,
  tagPrompt,
  titlePrompt,
} from "../prompts/add";
import { InsertTaskSchema } from "../schemas/task";

export default command(cliConfig.commands.add, async (argv) => {
  const isInteractive = argv.flags.interactive || !argv._.title;

  const taskInput = isInteractive
    ? {
        title: await titlePrompt(),
        due_date: await dueDatePrompt(),
        priority: await priorityPrompt(),
        repeat_rule: await repeatRulePrompt(),
        tag: await tagPrompt(),
      }
    : {
        title: argv._.title,
        due_date: argv.flags.due,
        priority: argv.flags.priority,
        repeat_rule: argv.flags.repeat,
        tag: argv.flags.tag,
      };

  const task = v.parse(InsertTaskSchema, taskInput);

  tasksQueries.createTask(task);

  isInteractive
    ? outro(`Task added: ${formatTask(task)}`)
    : log.success(`Task added: ${formatTask(task)}`);
});
