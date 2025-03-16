import * as v from "valibot";
import { db } from "../db";
import { TagSchema } from "../schemas/tag";
import {
  ArchivedTaskSummarySchema,
  InsertTaskSchema,
  type InsertTaskType,
  TaskSchema,
  TotalArchivedTasksSchema,
} from "../schemas/task";

export const tasksQueries = {
  getAllTasks: () => {
    const result = db
      .query(
        `SELECT tasks.*, tags.name AS tag
         FROM tasks
         LEFT JOIN task_tags ON tasks.id = task_tags.task_id
         LEFT JOIN tags ON task_tags.tag_id = tags.id
         ORDER BY 
           CASE WHEN completed_at IS NULL THEN 0 ELSE 1 END, 
           CASE WHEN due_date IS NULL THEN 1 ELSE 0 END, 
           due_date ASC, 
           priority DESC, 
           created_at ASC
`,
      )
      .all();

    return v.parse(v.array(TaskSchema), result);
  },

  getTaskById: (id: number) => {
    const result = db.query("SELECT * FROM tasks WHERE id = ?").get(id);

    if (!result) {
      throw new Error(`Task ${id} not found.`);
    }

    return v.parse(TaskSchema, result);
  },

  createTask: (taskInput: InsertTaskType) => {
    const validatedTask = v.parse(InsertTaskSchema, taskInput);

    const transaction = db.transaction(() => {
      const result = db.run(
        "INSERT INTO tasks (title, due_date, repeat_rule, priority)VALUES (?, ?, ?, ?);",
        [
          validatedTask.title,
          validatedTask.due_date,
          validatedTask.repeat_rule,
          validatedTask.priority,
        ],
      );

      const taskId = result.lastInsertRowid;

      if (validatedTask.tag) {
        db.run(
          "INSERT INTO tags (name) VALUES (?) ON CONFLICT(name) DO NOTHING;",
          [validatedTask.tag],
        );

        const tagRowResult = db
          .query("SELECT id, name FROM tags WHERE name = ?;")
          .get(validatedTask.tag);

        const validatedTagRowResult = v.parse(TagSchema, tagRowResult);

        if (validatedTagRowResult) {
          db.run("INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?);", [
            taskId,
            validatedTagRowResult.id,
          ]);
        }
      }

      return taskId;
    });

    return transaction();
  },

  deleteTaskById: (id: number) => {
    return db.run("DELETE FROM tasks WHERE id = ?;", [id]);
  },

  getCompletedTasks: () => {
    const result = db
      .query("SELECT * FROM tasks WHERE completed_at IS NOT NULL")
      .all();

    return v.parse(v.array(TaskSchema), result);
  },

  deleteCompletedTasks: () => {
    return db.run("DELETE FROM tasks WHERE completed_at IS NOT NULL");
  },

  markTaskAsCompleted: (id: number) => {
    return db.run(
      `UPDATE tasks 
       SET completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND completed_at IS NULL;`,
      [id],
    );
  },

  archiveTaskById: (id: number) => {
    return db.run(
      `UPDATE tasks 
       SET archived_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?;`,
      [id],
    );
  },

  deleteArchivedTasks: () => {
    return db.run("DELETE FROM tasks WHERE archived_at IS NOT NULL;");
  },

  getArchivedTasks: () => {
    const result = db
      .query("SELECT * FROM tasks WHERE archived_at IS NOT NULL")
      .all();

    return v.parse(v.array(TaskSchema), result);
  },

  unarchiveAllTasks: () => {
    return db.run(
      `UPDATE tasks 
       SET archived_at = NULL, updated_at = CURRENT_TIMESTAMP 
       WHERE archived_at IS NOT NULL;`,
    );
  },

  unarchiveTaskById: (id: number) => {
    return db.run(
      `UPDATE tasks 
       SET archived_at = NULL, updated_at = CURRENT_TIMESTAMP  
       WHERE id = ? AND archived_at IS NOT NULL;`,
      [id],
    );
  },

  getArchiveSummary: () => {
    const result = db
      .query(
        `SELECT tags.name AS tag, COUNT(*) AS count 
         FROM tasks 
         JOIN task_tags ON tasks.id = task_tags.task_id 
         JOIN tags ON task_tags.tag_id = tags.id 
         WHERE tasks.archived_at IS NOT NULL 
         GROUP BY tags.name;
`,
      )
      .all();

    return v.parse(v.array(ArchivedTaskSummarySchema), result);
  },

  getTotalArchivedTasks: () => {
    const result = db
      .query(
        `SELECT COUNT(*) as count 
         FROM tasks 
         WHERE archived_at IS NOT NULL`,
      )
      .get() ?? { count: 0 };

    return v.parse(TotalArchivedTasksSchema, result);
  },
};
