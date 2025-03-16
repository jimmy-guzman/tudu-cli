import { describe, expect, it } from "bun:test";

import { getNextDueDate } from "./get-next-due-date";

describe("getNextDueDate", () => {
  it("should return the next due date for daily repeat", () => {
    const result = getNextDueDate("2025-03-20", "daily");

    expect(result).toBe("2025-03-21");
  });

  it("should return the next due date for weekly repeat", () => {
    const result = getNextDueDate("2025-03-20", "weekly");

    expect(result).toBe("2025-03-27");
  });

  it("should return the next due date for monthly repeat", () => {
    const result = getNextDueDate("2025-03-20", "monthly");

    expect(result).toBe("2025-04-20");
  });

  it("should return an empty string for null due date", () => {
    const result = getNextDueDate(null, "daily");

    expect(result).toBe(null);
  });

  it("should return an empty string for invalid date", () => {
    const result = getNextDueDate("invalid-date", "daily");

    expect(result).toBe(null);
  });
});
