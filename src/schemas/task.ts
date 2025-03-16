import * as v from "valibot";

export const TaskRepeatRuleSchema = v.union([
  v.literal("daily"),
  v.literal("weekly"),
  v.literal("monthly"),
]);

export type TaskRepeatRuleType = v.InferInput<typeof TaskRepeatRuleSchema>;

export const TaskPrioritySchema = v.union([
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
]);

export type TaskPriorityType = v.InferInput<typeof TaskPrioritySchema>;

export const TaskDueDateSchema = v.pipe(
  v.string(),
  v.isoDate("Invalid date format. Use YYYY-MM-DD."),
);

export const TaskTitleSchema = v.string("Task description is required.");

export const TaskSchema = v.object({
  id: v.pipe(v.unknown(), v.transform(Number)),
  title: v.string(),
  tag: v.nullable(v.string()),
  due_date: v.nullable(TaskDueDateSchema),
  repeat_rule: v.nullable(TaskRepeatRuleSchema),
  priority: v.nullable(TaskPrioritySchema),
  updated_at: v.nullable(v.string()),
  completed_at: v.nullable(v.string()),
  archived_at: v.nullable(v.string()),
  created_at: v.string(),
});

export type TaskType = v.InferInput<typeof TaskSchema>;

export const InsertTaskSchema = v.object({
  title: v.string(),
  tag: v.nullish(v.string(), null),
  due_date: v.nullish(TaskDueDateSchema, null),
  repeat_rule: v.nullish(TaskRepeatRuleSchema, null),
  priority: v.nullish(TaskPrioritySchema, "medium"),
});

export type InsertTaskType = v.InferInput<typeof InsertTaskSchema>;

export const ArchivedTaskSummarySchema = v.object({
  tag: v.nullable(v.string()),
  count: v.number(),
});

export const TotalArchivedTasksSchema = v.object({
  count: v.number(),
});
