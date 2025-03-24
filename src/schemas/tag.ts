import * as v from "valibot";

export const TagNameSchema = v.pipe(
  v.string(),
  v.minLength(1, "Tag cannot be empty"),
  v.maxLength(50, "Tag is too long"),
  v.regex(
    /^[a-zA-Z0-9-_]+$/,
    "Tag can only contain letters, numbers, hyphens, and underscores.",
  ),
);

export const TagSchema = v.object({
  name: TagNameSchema,
  id: v.pipe(v.unknown(), v.transform(Number)),
});
