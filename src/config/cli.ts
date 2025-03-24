import { inputValidator } from "../lib/input-validator";
import { TagNameSchema } from "../schemas/tag";
import {
  TaskDueDateSchema,
  TaskPrioritySchema,
  TaskRepeatRuleSchema,
} from "../schemas/task";

export const cliConfig = {
  name: "odot",
  help: {
    description: "A minimal, Bun-powered CLI for tracking tasks efficiently.",
    usage: "odot <command> [options]",
    examples: [
      "odot add 'Buy groceries' --due 2025-03-15 --priority high",
      "odot list --interactive",
      "odot done 3",
      "odot archive",
      "odot remove 5",
      "odot restore --all",
      "odot purge",
    ],
  },
  commands: {
    add: {
      name: "add",
      parameters: ["[title]" as const],
      flags: {
        interactive: {
          type: Boolean,
          description:
            "Launch interactive mode to guide you through adding a task.",
          alias: "i",
        },
        due: {
          type: inputValidator(TaskDueDateSchema),
          description: "Set a due date (format: YYYY-MM-DD).",
        },
        priority: {
          type: inputValidator(TaskPrioritySchema),
          description: "Set task priority: low, medium (default), or high.",
          default: "medium" as const,
        },
        repeat: {
          type: inputValidator(TaskRepeatRuleSchema),
          description:
            "Repeat the task on a daily, weekly, or monthly schedule.",
        },
        tag: {
          type: inputValidator(TagNameSchema),
          description: "Categorize the task (e.g., work, personal).",
        },
      },
      help: {
        description: "Add a new task to your to-do list.",
        usage: "odot add [title] [options]",
        examples: [
          'odot add "Write blog post" --due 2025-03-15 --priority high --tag work',
          "odot add -i  # Start interactive mode to add a task",
          'odot add "Read book" --repeat weekly',
        ],
      },
    },
    list: {
      name: "list",
      alias: "ls",
      help: {
        description:
          "Show all tasks. Use interactive mode to browse and manage them.",
        usage: "odot list [options]",
        examples: ["odot list", "odot list --interactive"],
      },
      flags: {
        interactive: {
          type: Boolean,
          alias: "i",
          description: "Browse and manage tasks interactively.",
        },
      },
    },
    done: {
      name: "done",
      parameters: ["<id>" as const],
      help: {
        description:
          "Mark one or more tasks as done and remove them from your active list.",
        usage: "odot done <task-id>",
        examples: ["odot done 3", "odot done 10"],
      },
    },
    purge: {
      name: "purge",
      help: {
        description:
          "Remove all archived tasks permanently. This action cannot be undone.",
        usage: "odot purge",
        examples: ["odot purge"],
      },
    },
    archive: {
      name: "archive",
      help: {
        description:
          "Move completed tasks out of the main list and into the archive.",
        usage: "odot archive",
        examples: ["odot archive"],
      },
    },
    remove: {
      name: "remove",
      alias: "rm",
      parameters: ["<id>" as const],
      help: {
        description: "Delete a task using its unique ID.",
        usage: "odot remove <task-id>",
        examples: ["odot remove 5", "odot remove 12"],
      },
    },
    restore: {
      name: "restore",
      parameters: ["[id]" as const],
      flags: {
        all: {
          type: Boolean,
          alias: "a",
          description: "Restore all archived tasks at once.",
        },
      },
      help: {
        description: "Restore one or all archived tasks back to the main list.",
        usage: "odot restore [id] [--all]",
        examples: [
          "odot restore 7      # Restore task with ID 7",
          "odot restore --all  # Bring back all archived tasks",
          "odot restore -a",
        ],
      },
    },
    config: {
      name: "config",
      parameters: ["<key>" as const],
      help: {
        description: "Inspect configuration values for odot.",
        usage: "odot config <key>",
        examples: [
          "odot config path     # Show where your SQLite database is stored",
        ],
      },
    },
  },
};
