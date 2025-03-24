import { type BaseIssue, type BaseSchema, flatten, safeParse } from "valibot";

/**
 * Creates a validator function for CLI inputs using a Valibot schema.
 *
 * If the provided value is valid, it returns the parsed output.
 * If validation fails, it throws an error with a formatted message.
 *
 * @param schema - The Valibot schema to validate against.
 * @returns A function that validates a given value against the schema.
 * @throws {Error} If validation fails.
 */
export const inputValidator = <
  const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: TSchema,
) => {
  return (value: unknown) => {
    const result = safeParse(schema, value);

    if (!result.success) {
      throw new Error(flatten(result.issues).root?.join("") ?? "Unknown error");
    }

    return result.output;
  };
};
