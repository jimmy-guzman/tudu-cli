import { describe, expect, it } from "bun:test";
import * as c from "picocolors";

import { formatTask, formatTaskWithPrefix } from "./formatters";

const mockTask = {
  id: "123",
  title: "Test Task",
  due_date: "2025-03-20",
  priority: "high" as const,
  repeat_rule: "daily" as const,
  tag: "work",
  completed_at: null,
  updated_at: "",
  archived_at: "",
  created_at: "",
};

describe("formatTaskWithPrefix", () => {
  it("should format an incomplete task correctly", () => {
    const result = formatTaskWithPrefix(mockTask);

    expect(result).toBe(
      `[ ] 123. ${c.bold("Test Task")} (due: ${c.gray("2025-03-20")}) (priority: ${c.bold(c.red("high"))}) (repeats: daily) [${c.cyan("work")}]`,
    );
  });

  it("should format a completed task correctly", () => {
    const result = formatTaskWithPrefix({
      ...mockTask,
      completed_at: "2025-03-15",
    });

    expect(result.startsWith("[X]")).toBe(true);
  });

  it("should handle overdue tasks", () => {
    const overdueTask = { ...mockTask, due_date: "2023-03-10" };
    const result = formatTaskWithPrefix(overdueTask);

    expect(result.includes(c.red("2023-03-10!"))).toBe(true);
  });
});

describe("formatTask", () => {
  it("should format a task correctly when adding", () => {
    const result = formatTask(mockTask);

    expect(result).toBe(
      `${c.bold("Test Task")} (due: ${c.gray("2025-03-20")}) (priority: ${c.bold(c.red("high"))}) (repeats: daily) [${c.cyan("work")}]`,
    );
  });

  it("should handle missing optional fields", () => {
    const result = formatTask({ title: "Minimal Task" });

    expect(result).toBe(`${c.bold("Minimal Task")}`);
  });
});
