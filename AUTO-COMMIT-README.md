# ACCESSIBLE AUTO-COMMIT TOOL

Simple automatic git commits for developers with accessibility needs.

## WHAT THIS DOES

This tool automatically commits your REAL work as you code.

You don't need to type commit messages.

Just code normally - it commits for you every 30 minutes.

## WHY THIS IS OK

- It commits YOUR actual work
- It does NOT fake activity
- It does NOT run when you're not coding
- It just removes the typing barrier

This is a legitimate accessibility tool.

## SUPER EASY START

### Method 1: Double-click the file

1. Open folder in Windows Explorer
2. Find file: `START-AUTO-COMMIT.bat`
3. Double-click it
4. Leave the window open while you code
5. Press Ctrl+C when done

### Method 2: Type one command

Open terminal in this folder and type:

```
node auto-commit.js
```

Press Ctrl+C to stop.

## ONE-TIME COMMIT

Need to commit right now?

Double-click: `COMMIT-NOW.bat`

Or type: `node commit-now.js`

## HOW IT WORKS

1. You start the tool
2. You code normally
3. Every 30 minutes it checks for changes
4. If you changed files, it commits them
5. It generates a commit message automatically
6. Your work is saved to git

## WHAT GETS COMMITTED

ONLY files you actually changed.

The tool commits:
- Code files you edited
- HTML/CSS you changed
- Any file you modified

The tool does NOT:
- Make fake changes
- Run when you're away
- Simulate activity

## CUSTOMIZING

You can change how often it commits.

Open `auto-commit.js` in any text editor.

Find this line near the top:

```javascript
checkInterval: 30,
```

Change 30 to any number of minutes you want.

Save the file.

## SCREEN READER NOTES

All batch files have clear echo messages.

The terminal shows:
- When it checks for changes
- What files changed
- When it commits
- How many commits you made

Messages are simple and clear.

## EXAMPLE SESSION

1. Double-click START-AUTO-COMMIT.bat
2. You see: "Auto-commit tool started"
3. Code for 30 minutes
4. You see: "Found 3 changed files"
5. You see: "Changes committed successfully"
6. Continue coding
7. Press Ctrl+C when done
8. You see: "Session summary: 4 commits"

## FILES CREATED

The tool creates these files:

- `.auto-commit-status.json` - Tracks your commit count
- Git commits in your repository

That's it!

## TROUBLESHOOTING

**Error: Not in a git repository**

Solution: Type `git init` first

**Error: Nothing to commit**

This is OK - you haven't made changes yet

**Tool won't start**

Make sure Node.js is installed

Type: `node --version`

If you get an error, install Node.js from nodejs.org

## QUESTIONS

**Is this cheating?**

NO. It commits your real work. You're just automating the commit message typing.

**Will this work while I'm away?**

NO. It only commits when YOU make actual changes to files.

**Can I use this at work?**

YES. This is an accessibility tool. It commits real work only.

**How do I stop it?**

Press Ctrl+C in the terminal window.

**Will it commit every 30 minutes even if I didn't code?**

NO. It only commits if you actually changed files.

## SUPPORT

This is a free accessibility tool.

You can modify it however you need.

## SUMMARY

START: Double-click `START-AUTO-COMMIT.bat`

STOP: Press Ctrl+C

COMMIT NOW: Double-click `COMMIT-NOW.bat`

That's all you need to know!

Happy coding!
