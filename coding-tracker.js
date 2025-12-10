#!/usr/bin/env node

/**
 * Ethical Coding Practice Tracker
 * Helps maintain genuine coding habits with authentic progress tracking
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

// Configuration
const CONFIG = {
    sessionInterval: 45, // Minutes between commit reminders
    breakReminder: 25, // Pomodoro-style break reminder (minutes)
    logFile: path.join(__dirname, 'practice-log.json'),
    progressFile: path.join(__dirname, 'PROGRESS.md'),
    practiceFile: path.join(__dirname, 'daily-practice.js')
};

// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility to prompt user
const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Load or initialize practice log
const loadLog = () => {
    if (fs.existsSync(CONFIG.logFile)) {
        return JSON.parse(fs.readFileSync(CONFIG.logFile, 'utf8'));
    }
    return {
        sessions: [],
        totalHours: 0,
        currentStreak: 0,
        longestStreak: 0
    };
};

// Save practice log
const saveLog = (log) => {
    fs.writeFileSync(CONFIG.logFile, JSON.stringify(log, null, 2));
};

// Start a new coding session
const startSession = async () => {
    console.log('\n🚀 Starting New Coding Session\n');
    console.log('═'.repeat(50));

    const sessionGoal = await prompt('What do you want to accomplish today? ');
    const topics = await prompt('Topics/Technologies (comma-separated): ');
    const estimatedTime = await prompt('How long do you plan to work (minutes)? ');

    const session = {
        id: Date.now(),
        startTime: new Date().toISOString(),
        goal: sessionGoal,
        topics: topics.split(',').map(t => t.trim()),
        estimatedTime: parseInt(estimatedTime) || 60,
        completed: false,
        achievements: []
    };

    console.log('\n✅ Session started! Timer will remind you to commit your progress.\n');
    return session;
};

// End session and log progress
const endSession = async (session) => {
    console.log('\n📝 Session Summary\n');
    console.log('═'.repeat(50));

    const accomplished = await prompt('What did you accomplish? ');
    const challenges = await prompt('Any challenges faced? ');
    const learnings = await prompt('Key learnings: ');
    const rating = await prompt('Rate this session (1-5): ');

    session.endTime = new Date().toISOString();
    session.completed = true;
    session.accomplished = accomplished;
    session.challenges = challenges;
    session.learnings = learnings;
    session.rating = parseInt(rating) || 3;

    const duration = (new Date(session.endTime) - new Date(session.startTime)) / (1000 * 60);
    session.actualTime = Math.round(duration);

    return session;
};

// Create commit with real progress
const createCommit = async (message) => {
    return new Promise((resolve, reject) => {
        exec('git add .', (error) => {
            if (error) {
                console.log('⚠️  Not in a git repository or no changes to commit');
                resolve(false);
                return;
            }

            const timestamp = new Date().toLocaleString();
            const fullMessage = `${message}\n\n🕐 Session logged: ${timestamp}\n\n🤖 Generated with Coding Practice Tracker\n\nCo-Authored-By: Practice Tracker <noreply@localhost>`;

            exec(`git commit -m "${fullMessage}"`, (error, stdout, stderr) => {
                if (error) {
                    if (stderr.includes('nothing to commit')) {
                        console.log('ℹ️  No changes to commit yet. Keep coding!');
                    } else {
                        console.log('⚠️  Commit failed:', stderr);
                    }
                    resolve(false);
                } else {
                    console.log('✅ Progress committed!');
                    resolve(true);
                }
            });
        });
    });
};

// Update progress markdown file
const updateProgressFile = (session, log) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    let content = '';
    if (fs.existsSync(CONFIG.progressFile)) {
        content = fs.readFileSync(CONFIG.progressFile, 'utf8');
    } else {
        content = '# Coding Practice Progress\n\n';
        content += '> Tracking my genuine learning journey\n\n';
    }

    const sessionEntry = `
## ${date} - Session at ${time}

**Goal:** ${session.goal}

**Topics:** ${session.topics.join(', ')}

**Duration:** ${session.actualTime} minutes

**Accomplished:** ${session.accomplished}

**Learnings:** ${session.learnings}

**Challenges:** ${session.challenges || 'None'}

**Rating:** ${'⭐'.repeat(session.rating)}

**Total Practice Hours:** ${log.totalHours.toFixed(1)} | **Streak:** ${log.currentStreak} days

---
`;

    content += sessionEntry;
    fs.writeFileSync(CONFIG.progressFile, content);
};

// Generate practice problem
const generatePracticeProblem = () => {
    const problems = [
        {
            title: 'Array Manipulation',
            description: 'Write a function to rotate an array k positions',
            difficulty: 'Easy',
            hints: ['Consider using array slicing', 'Handle edge cases']
        },
        {
            title: 'String Reversal',
            description: 'Reverse words in a string while preserving spaces',
            difficulty: 'Medium',
            hints: ['Split and reverse', 'Join with original spacing']
        },
        {
            title: 'Binary Search',
            description: 'Implement binary search on a rotated sorted array',
            difficulty: 'Medium',
            hints: ['Find pivot point first', 'Apply binary search on correct half']
        },
        {
            title: 'Linked List Cycle',
            description: 'Detect if a linked list has a cycle using O(1) space',
            difficulty: 'Medium',
            hints: ['Use two pointers', 'Fast and slow pointer approach']
        },
        {
            title: 'Dynamic Programming',
            description: 'Find longest increasing subsequence in an array',
            difficulty: 'Hard',
            hints: ['Build solution bottom-up', 'Store intermediate results']
        }
    ];

    return problems[Math.floor(Math.random() * problems.length)];
};

// Timer for reminders
const setReminders = (intervalMinutes, callback) => {
    const intervalMs = intervalMinutes * 60 * 1000;
    return setInterval(callback, intervalMs);
};

// Main application
const main = async () => {
    console.clear();
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   Ethical Coding Practice Tracker v1.0        ║');
    console.log('║   Track Real Progress, Build Real Skills      ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    const log = loadLog();

    while (true) {
        console.log('\nWhat would you like to do?\n');
        console.log('1. Start Practice Session');
        console.log('2. Generate Practice Problem');
        console.log('3. View Progress Summary');
        console.log('4. Quick Commit Current Work');
        console.log('5. Exit\n');

        const choice = await prompt('Choose an option (1-5): ');

        switch (choice.trim()) {
            case '1':
                const session = await startSession();

                // Set up reminders
                let reminderCount = 0;
                const reminder = setReminders(CONFIG.breakReminder, () => {
                    reminderCount++;
                    console.log(`\n⏰ Reminder: You've been coding for ${reminderCount * CONFIG.breakReminder} minutes!`);
                    console.log('💡 Consider committing your progress or taking a short break.\n');
                });

                // Wait for user to indicate session completion
                await prompt('\n👉 Press Enter when you\'re done with this session...\n');

                clearInterval(reminder);

                const completedSession = await endSession(session);

                // Update logs
                log.sessions.push(completedSession);
                log.totalHours += completedSession.actualTime / 60;

                // Update streak
                const today = new Date().toDateString();
                const lastSessionDate = log.sessions.length > 1
                    ? new Date(log.sessions[log.sessions.length - 2].startTime).toDateString()
                    : null;

                if (lastSessionDate !== today) {
                    log.currentStreak++;
                    if (log.currentStreak > log.longestStreak) {
                        log.longestStreak = log.currentStreak;
                    }
                }

                saveLog(log);
                updateProgressFile(completedSession, log);

                // Commit progress
                const commitMsg = `Practice Session: ${completedSession.goal}\n\nTopics: ${completedSession.topics.join(', ')}\nDuration: ${completedSession.actualTime} minutes\nRating: ${completedSession.rating}/5`;
                await createCommit(commitMsg);

                console.log('\n🎉 Great work! Session logged successfully.\n');
                break;

            case '2':
                const problem = generatePracticeProblem();
                console.log('\n📋 Practice Problem Generated\n');
                console.log('═'.repeat(50));
                console.log(`\nTitle: ${problem.title}`);
                console.log(`Difficulty: ${problem.difficulty}`);
                console.log(`\nDescription: ${problem.description}`);
                console.log(`\nHints:`);
                problem.hints.forEach((hint, i) => {
                    console.log(`  ${i + 1}. ${hint}`);
                });
                console.log('\n');

                // Save problem to practice file
                const problemCode = `
/*
 * Problem: ${problem.title}
 * Difficulty: ${problem.difficulty}
 * Generated: ${new Date().toLocaleString()}
 *
 * ${problem.description}
 *
 * Hints:
${problem.hints.map((h, i) => ` * ${i + 1}. ${h}`).join('\n')}
 */

function solve() {
    // Your solution here
}

// Test cases
console.log(solve());
`;

                fs.appendFileSync(CONFIG.practiceFile, problemCode);
                console.log(`✅ Problem added to ${CONFIG.practiceFile}\n`);
                break;

            case '3':
                console.log('\n📊 Progress Summary\n');
                console.log('═'.repeat(50));
                console.log(`Total Sessions: ${log.sessions.length}`);
                console.log(`Total Hours Practiced: ${log.totalHours.toFixed(1)}`);
                console.log(`Current Streak: ${log.currentStreak} days`);
                console.log(`Longest Streak: ${log.longestStreak} days`);

                if (log.sessions.length > 0) {
                    const avgRating = log.sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / log.sessions.length;
                    console.log(`Average Session Rating: ${avgRating.toFixed(1)}/5`);

                    console.log('\n📅 Recent Sessions:');
                    log.sessions.slice(-5).reverse().forEach(s => {
                        const date = new Date(s.startTime).toLocaleDateString();
                        console.log(`  • ${date}: ${s.goal} (${s.actualTime || 0}min)`);
                    });
                }
                console.log('\n');
                break;

            case '4':
                const quickMsg = await prompt('Describe what you worked on: ');
                await createCommit(`Quick progress update: ${quickMsg}`);
                break;

            case '5':
                console.log('\n👋 Keep coding! See you next session.\n');
                rl.close();
                process.exit(0);

            default:
                console.log('\n⚠️  Invalid option. Please choose 1-5.\n');
        }
    }
};

// Handle cleanup
process.on('SIGINT', () => {
    console.log('\n\n👋 Session interrupted. Progress saved.\n');
    rl.close();
    process.exit(0);
});

// Run the application
main().catch(error => {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
});
