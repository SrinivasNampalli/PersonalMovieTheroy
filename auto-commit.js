#!/usr/bin/env node

/**
 * Accessible Auto-Commit Script
 *
 * Automatically commits your actual work as you code.
 * Designed for accessibility - no complex typing needed.
 *
 * This commits REAL changes you make, just removes the barrier
 * of having to type commit messages.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ============================================
// CONFIGURATION - Easy to change
// ============================================
const CONFIG = {
    // How often to check for changes (in minutes)
    checkInterval: 30,

    // Automatically commit when changes detected?
    autoCommit: true,

    // Files to watch (leave empty to watch all)
    watchPatterns: ['*.js', '*.html', '*.css', '*.json', '*.md'],

    // Files to ignore
    ignorePatterns: ['node_modules', '.git', 'package-lock.json'],

    // Status file
    statusFile: path.join(__dirname, '.auto-commit-status.json')
};

// ============================================
// COMMIT MESSAGE GENERATOR
// ============================================
const generateCommitMessage = (changedFiles) => {
    const timestamp = new Date().toLocaleString();

    // Analyze what types of files changed
    const fileTypes = {
        code: ['.js', '.py', '.java', '.cpp', '.c', '.go', '.rs', '.ts', '.jsx', '.tsx'],
        style: ['.css', '.scss', '.sass', '.less'],
        markup: ['.html', '.xml', '.svg'],
        data: ['.json', '.yaml', '.yml', '.csv'],
        docs: ['.md', '.txt', '.pdf'],
        config: ['.config', '.env', '.gitignore']
    };

    const changes = {
        code: 0,
        style: 0,
        markup: 0,
        data: 0,
        docs: 0,
        config: 0
    };

    changedFiles.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        for (const [type, extensions] of Object.entries(fileTypes)) {
            if (extensions.includes(ext)) {
                changes[type]++;
                break;
            }
        }
    });

    // Generate message based on changes
    let message = 'Update: ';
    const changeTypes = [];

    if (changes.code > 0) changeTypes.push(`code files (${changes.code})`);
    if (changes.style > 0) changeTypes.push(`styles (${changes.style})`);
    if (changes.markup > 0) changeTypes.push(`markup (${changes.markup})`);
    if (changes.data > 0) changeTypes.push(`data files (${changes.data})`);
    if (changes.docs > 0) changeTypes.push(`documentation (${changes.docs})`);
    if (changes.config > 0) changeTypes.push(`config (${changes.config})`);

    if (changeTypes.length > 0) {
        message += changeTypes.join(', ');
    } else {
        message += `${changedFiles.length} file(s)`;
    }

    // Add some common work indicators
    const indicators = [
        'Working on features',
        'Progress update',
        'Development session',
        'Code improvements',
        'Feature development'
    ];

    const randomIndicator = indicators[Math.floor(Math.random() * indicators.length)];

    const fullMessage = `${message}

${randomIndicator}

Modified files:
${changedFiles.slice(0, 10).map(f => `- ${f}`).join('\n')}${changedFiles.length > 10 ? `\n- ... and ${changedFiles.length - 10} more` : ''}

⏰ Auto-committed: ${timestamp}

🤖 Accessible Auto-Commit Tool
This commit represents real work done during this coding session.`;

    return fullMessage;
};

// ============================================
// GIT OPERATIONS
// ============================================
const checkGitStatus = () => {
    return new Promise((resolve, reject) => {
        exec('git status --porcelain', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            // Parse git status output
            const lines = stdout.trim().split('\n').filter(line => line.length > 0);
            const changedFiles = lines.map(line => {
                // Format: "XY filename"
                return line.substring(3).trim();
            }).filter(file => {
                // Filter out ignored patterns
                return !CONFIG.ignorePatterns.some(pattern => file.includes(pattern));
            });

            resolve(changedFiles);
        });
    });
};

const commitChanges = (message) => {
    return new Promise((resolve, reject) => {
        // First, add all changes
        exec('git add .', (error) => {
            if (error) {
                console.log('⚠️  Error adding files:', error.message);
                resolve(false);
                return;
            }

            // Then commit with message
            const escapedMessage = message.replace(/"/g, '\\"');
            exec(`git commit -m "${escapedMessage}"`, (error, stdout, stderr) => {
                if (error) {
                    if (stderr.includes('nothing to commit')) {
                        console.log('ℹ️  No changes to commit');
                        resolve(false);
                    } else {
                        console.log('⚠️  Commit error:', stderr);
                        resolve(false);
                    }
                } else {
                    console.log('✅ Changes committed successfully!');
                    console.log(stdout);

                    // Push to GitHub so teammates can see your progress!
                    console.log('📤 Pushing your hard work to GitHub...');
                    exec('git push origin main', (pushError, pushStdout, pushStderr) => {
                        if (pushError) {
                            console.log('⚠️  Could not push to GitHub:', pushStderr);
                            console.log('💡 Your commit is saved locally - will retry next time');
                            resolve(true);
                        } else {
                            console.log('✅ Pushed to GitHub! Your team can see your dedication! 🚀');
                            resolve(true);
                        }
                    });
                }
            });
        });
    });
};

// ============================================
// STATUS TRACKING
// ============================================
const loadStatus = () => {
    if (fs.existsSync(CONFIG.statusFile)) {
        try {
            return JSON.parse(fs.readFileSync(CONFIG.statusFile, 'utf8'));
        } catch (e) {
            return { totalCommits: 0, lastCommit: null, sessions: [] };
        }
    }
    return { totalCommits: 0, lastCommit: null, sessions: [] };
};

const saveStatus = (status) => {
    fs.writeFileSync(CONFIG.statusFile, JSON.stringify(status, null, 2));
};

// ============================================
// MAIN WATCH LOOP
// ============================================
let isRunning = false;
let commitCount = 0;

const checkAndCommit = async () => {
    try {
        console.log(`\n🔍 Checking for changes... (${new Date().toLocaleTimeString()})`);

        const changedFiles = await checkGitStatus();

        if (changedFiles.length > 0) {
            console.log(`📝 Found ${changedFiles.length} changed file(s):`);
            changedFiles.slice(0, 5).forEach(file => {
                console.log(`   - ${file}`);
            });
            if (changedFiles.length > 5) {
                console.log(`   - ... and ${changedFiles.length - 5} more`);
            }

            if (CONFIG.autoCommit) {
                console.log('\n💾 Auto-committing changes...');
                const message = generateCommitMessage(changedFiles);
                const success = await commitChanges(message);

                if (success) {
                    commitCount++;
                    const status = loadStatus();
                    status.totalCommits++;
                    status.lastCommit = new Date().toISOString();
                    saveStatus(status);

                    console.log(`\n✨ Total commits this session: ${commitCount}`);
                    console.log(`📊 Total commits all time: ${status.totalCommits}`);
                }
            }
        } else {
            console.log('✓ No changes detected');
        }

        console.log(`\n⏰ Next check in ${CONFIG.checkInterval} minute(s)...`);
        console.log('━'.repeat(60));

    } catch (error) {
        console.log('⚠️  Error:', error.message);
    }
};

const startWatching = () => {
    if (isRunning) {
        console.log('⚠️  Already running!');
        return;
    }

    isRunning = true;
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║                                                    ║');
    console.log('║     ACCESSIBLE AUTO-COMMIT TOOL STARTED            ║');
    console.log('║                                                    ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    console.log(`⚙️  Configuration:`);
    console.log(`   - Check interval: ${CONFIG.checkInterval} minutes`);
    console.log(`   - Auto-commit: ${CONFIG.autoCommit ? 'ENABLED' : 'DISABLED'}`);
    console.log(`\n🚀 Watching for changes...\n`);
    console.log('💡 TIP: Just code normally. Your work will be committed automatically!\n');
    console.log('Press Ctrl+C to stop\n');
    console.log('━'.repeat(60));

    // Initial check
    checkAndCommit();

    // Set up interval
    const intervalMs = CONFIG.checkInterval * 60 * 1000;
    const interval = setInterval(checkAndCommit, intervalMs);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Stopping auto-commit...\n');
        clearInterval(interval);
        isRunning = false;

        console.log(`📊 Session Summary:`);
        console.log(`   - Commits this session: ${commitCount}`);
        console.log(`\n👋 Auto-commit stopped. Your progress has been saved!\n`);

        process.exit(0);
    });
};

// ============================================
// RUN THE WATCHER
// ============================================
console.log('\n🎯 Accessible Auto-Commit for Developers\n');

// Check if we're in a git repo
exec('git rev-parse --git-dir', (error) => {
    if (error) {
        console.log('❌ ERROR: Not in a git repository!');
        console.log('💡 Run "git init" first to initialize git.\n');
        process.exit(1);
    } else {
        startWatching();
    }
});
