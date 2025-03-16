import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";

import store from "./store";

const dbPath = store.get("path");

if (!dbPath) {
  throw new Error("No DB path set");
}

const dbDir = dbPath.substring(0, dbPath.lastIndexOf("/"));

if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });

export const db = new Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL,
    due_date TEXT DEFAULT NULL,
    repeat_rule TEXT DEFAULT NULL,  
    priority TEXT DEFAULT NULL,
    completed_at DATETIME DEFAULT NULL,
    archived_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES tasks(id) ON DELETE CASCADE
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS task_tags (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
  );
`);
