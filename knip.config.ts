import type { KnipConfig } from "knip";

export default {
  ignore: ["**/*.spec.*"],
  ignoreBinaries: ["publish", "bin/odot"],
} satisfies KnipConfig;
