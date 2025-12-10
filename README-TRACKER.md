# Ethical Coding Practice Tracker

A legitimate system to help you maintain consistent coding practice habits and document genuine learning progress.

## 🎯 Purpose

This tool helps you:
- **Track real coding sessions** with honest time logging
- **Build consistent habits** with reminders and streak tracking
- **Document genuine progress** with detailed session notes
- **Generate practice problems** to improve your skills
- **Create authentic reports** of your learning journey

## ✅ What This Tool Does (Ethically)

1. **Session Management**
   - Prompts you to set goals before coding
   - Reminds you to take breaks (Pomodoro-style)
   - Logs what you actually accomplished
   - Tracks genuine time spent coding

2. **Progress Tracking**
   - Records real practice sessions
   - Maintains honest streak counts
   - Generates authentic progress reports
   - Documents actual learnings and challenges

3. **Commit Assistance**
   - Commits ONLY when you've done real work
   - Creates detailed commit messages based on your input
   - Never simulates activity or fake changes
   - Helps you remember to commit actual progress

4. **Practice Support**
   - Generates coding challenges to solve
   - Creates templates for learning projects
   - Tracks topics you're studying
   - Builds a portfolio of real work

## ❌ What This Tool Does NOT Do

- ❌ Make fake commits when you're not coding
- ❌ Simulate keyboard activity or mouse movement
- ❌ Create artificial code changes
- ❌ Misrepresent your activity to tracking systems
- ❌ Run when you're away from your computer

## 🚀 Getting Started

### Installation

```bash
# Make the scripts executable (Linux/Mac)
chmod +x coding-tracker.js generate-report.js

# Or run with node
node coding-tracker.js
```

### Usage

**Start a Practice Session:**
```bash
node coding-tracker.js
```

Then select option 1 to start a session. You'll be prompted to:
1. Set your session goal
2. Specify topics you're working on
3. Estimate how long you'll work

The tracker will:
- Remind you every 25 minutes to take breaks
- Prompt you to commit when you're done
- Log your actual accomplishments

**Generate Reports:**
```bash
node generate-report.js
```

Creates three reports:
- Weekly report (last 7 days)
- Monthly report (last 30 days)
- All-time report (complete history)

## 📋 Features

### 1. Interactive Session Tracking

```
What do you want to accomplish today? Learn React hooks
Topics/Technologies: React, JavaScript, Web Development
How long do you plan to work? 60

✅ Session started! Timer will remind you to commit your progress.
```

### 2. Break Reminders

Every 25 minutes:
```
⏰ Reminder: You've been coding for 25 minutes!
💡 Consider committing your progress or taking a short break.
```

### 3. Session Summary

When you finish:
```
What did you accomplish? Built a custom hook for API calls
Any challenges faced? Understanding useEffect dependencies
Key learnings: Hooks must follow rules of hooks
Rate this session (1-5): 4
```

### 4. Practice Problem Generator

Get random coding challenges:
```
📋 Practice Problem Generated

Title: Binary Search
Difficulty: Medium

Description: Implement binary search on a rotated sorted array

Hints:
  1. Find pivot point first
  2. Apply binary search on correct half
```

### 5. Progress Dashboard

```
📊 Progress Summary

Total Sessions: 15
Total Hours Practiced: 12.5
Current Streak: 5 days
Longest Streak: 7 days
Average Session Rating: 4.2/5

📅 Recent Sessions:
  • 12/10/2025: Learn React hooks (60min)
  • 12/09/2025: Algorithm practice (45min)
  • 12/08/2025: Build API integration (90min)
```

## 📊 Generated Files

The tracker creates these files:

- `practice-log.json` - Your session history
- `PROGRESS.md` - Detailed progress markdown
- `daily-practice.js` - Generated practice problems
- `reports/weekly-report.md` - Weekly summary
- `reports/monthly-report.md` - Monthly summary
- `reports/all-time-report.md` - Complete history

## 🎓 Best Practices

1. **Be Honest**
   - Only log time you actually spent coding
   - Rate sessions based on real productivity
   - Record genuine challenges and learnings

2. **Stay Consistent**
   - Set realistic session goals
   - Use the break reminders (avoid burnout)
   - Build daily habits, even if sessions are short

3. **Commit Real Work**
   - Only commit when you've made actual changes
   - Write meaningful commit messages
   - Use the tracker to remind you, not replace you

4. **Review Progress**
   - Generate weekly reports to see patterns
   - Identify topics that need more practice
   - Celebrate genuine achievements

## 🔧 Customization

Edit `CONFIG` in `coding-tracker.js`:

```javascript
const CONFIG = {
    sessionInterval: 45,  // Minutes between commit reminders
    breakReminder: 25,    // Pomodoro break interval
    logFile: './practice-log.json',
    progressFile: './PROGRESS.md'
};
```

## 📝 Example Workflow

**Evening Study Session:**

1. Start tracker: `node coding-tracker.js`
2. Choose "Start Practice Session"
3. Set goal: "Complete 3 LeetCode problems"
4. Work on actual problems for 45 minutes
5. Tracker reminds you to take a break
6. Continue working or end session
7. Log what you accomplished
8. Tracker commits your real work

**Weekend Review:**

1. Generate reports: `node generate-report.js`
2. Review weekly progress
3. Identify improvement areas
4. Set goals for next week

## 🌟 Benefits

- **Authentic Portfolio**: Real commits showing genuine progress
- **Honest Metrics**: Accurate data on your learning patterns
- **Skill Development**: Actual practice with real problems
- **Habit Building**: Consistent, legitimate coding practice
- **Professional Growth**: Portfolio that reflects true abilities

## 📄 License

Free to use for personal learning and development.

---

**Remember**: This tool works best when you're honest with yourself. Real progress comes from genuine effort, not fake metrics. 💪

*Happy coding!* 🚀
