## **@odot/cli**

> @odot/cli is a lightweight, Bun-powered CLI for managing tasks with **both CLI commands & interactive prompts**.

---

## **Installation**

```sh
bun install -g @odot/cli
```

Or via **Homebrew** (if supported in the future):

```sh
brew install odot
```

---

## **Features**

- Quickly add tasks (CLI or interactive mode)
- Supports due dates, priorities, tagging & recurring tasks
- Fast & lightweight (Bun + SQLite)
- Works offline – tasks are stored in your SQLite database

---

## **Usage**

### **Add a Task**

**CLI Mode:**

```sh
odot add "Write blog post" --due=2025-03-15 --priority=high --repeat=weekly --tag=writing
```

**Output:**

```sh
◆  Task added: Write blog post (due: 2025-03-15!) (priority: high) (repeats: weekly) [writing]
```

**Interactive Mode:**

```sh
odot add
```

Guides you step-by-step to create a task.

---

### **List Tasks**

```sh
odot list
```

**Example Output:**

```sh
┌   To-Do List
│
│  [ ] 1. Buy groceries (due: 2025-03-10) (priority: medium)
│  [ ] 2. Finish project report (due: 2025-03-14!) (priority: high) (repeats: weekly)
│  [x] 3. Write blog post (due: 2025-03-15!) (priority: high) (repeats: weekly) [writing]│
```

**Interactive Mode:**

```sh
odot list --interactive
```

Allows selecting and managing tasks interactively.

---

### **Mark as Done**

```sh
odot done 2
```

**Output:**

```sh
◆  Task 2 marked as complete.
│
●  Recurring task re-added: "Write blog post" (Repeats: weekly, New Due: 2025-03-22)
```

---

### **Delete a Task**

```sh
odot remove 3
```

**Confirmation:**

```sh
◆  Are you sure you want to delete "Write blog post"?
│  ● Yes / ○ No
└
```

```sh
│
◇  Are you sure you want to permanently delete tasks 3?
│  Yes
│
└  Task 3 has been removed.
```

---

### **Archive & Restore**

```sh
odot archive        # Move completed tasks to archive
odot restore 3      # Restore a task
odot restore --all  # Restore all (alias: -a)
```

---

### **Purge Archived Tasks**

```sh
odot purge
```

**Confirmation:**

```
Delete 15 archived tasks? (y/n)
```

---

### **SQLite Storage Location**

By default, **odot** stores tasks in an SQLite database located at:

- **macOS/Linux:** `~/.config/odot/tasks.db`
- **Windows:** `%APPDATA%\odot\tasks.db`

You can override this location using the `ODOT_DB_PATH` environment variable:

```sh
export ODOT_DB_PATH="$HOME/my-tasks.db"
```

To check where your current database is stored:

```sh
odot config path
```

**Example Output:**

```sh
●  SQLite Database Path: /home/user/.config/odot/tasks.db
```

---

## **Future Plans**

- (Planned) Task editing (`odot edit 2 --priority=high`)
- (Planned) Task reminders (`odot notify`)
- (Planned) Auto-suggested categories
- (Planned) Optional cloud sync

---

## **Development**

```sh
bun install
bun run bin/odot.ts   # Run locally
bun build             # Build
```

---

## **Contributing**

PRs welcome! Open an issue for feature requests or bug reports.
