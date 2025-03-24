import { homedir } from "node:os";
import { join } from "node:path";

type ConfigKey = "path";

const store = new Map<ConfigKey, string>();

const defaultDbPath = join(homedir(), ".odot", "odot.db");

const dbPath = process.env.ODOT_DB_PATH || defaultDbPath;

store.set("path", dbPath);

export default store;
