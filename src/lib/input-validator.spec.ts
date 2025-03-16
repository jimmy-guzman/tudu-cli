import { describe, expect, it } from "bun:test";
import * as v from "valibot";

import { inputValidator } from "./input-validator";

describe("inputValidator", () => {
  const validateString = inputValidator(v.pipe(v.string(), v.minLength(3)));
  const validateNumber = inputValidator(v.number());

  it("should validate and return a valid string", () => {
    expect(validateString("valid")).toBe("valid");
  });

  it("should throw an error for an invalid string", () => {
    expect(() => validateString("no")).toThrow(
      "Invalid length: Expected >=3 but received 2",
    );
  });

  it("should validate and return a valid number", () => {
    expect(validateNumber(42)).toBe(42);
  });

  it("should throw an error for an invalid number", () => {
    expect(() => validateNumber("not a number")).toThrow(
      'Invalid type: Expected number but received "not a number"',
    );
  });
});
