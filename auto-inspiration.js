#!/usr/bin/env node

/**
 * Auto-Inspiration Writer
 *
 * Automatically writes inspirational illness/hardship messages to a dedicated file
 * every minute to keep you motivated while you work through hard times.
 *
 * This runs in the background and commits changes automatically.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    // How often to add inspiration (in minutes)
    writeInterval: 15,

    // File to write inspiration to
    inspirationFile: path.join(__dirname, 'MY-INSPIRATION.md'),

    // Auto-commit the changes?
    autoCommit: true,

    // Message categories to use
    categories: ['gamedev']  // Focus on game development progress
};

// ============================================
// GAME DEVELOPMENT COMMIT MESSAGES
// ============================================
const GAME_DEV_COMMITS = [
    "Add player movement system",
    "Implement collision detection",
    "Create inventory management",
    "Add enemy AI pathfinding",
    "Implement health and damage system",
    "Add quest system foundation",
    "Create dialogue system",
    "Implement save/load functionality",
    "Add particle effects system",
    "Create map generation algorithm",
    "Implement character stats system",
    "Add combat mechanics",
    "Create NPC behavior system",
    "Implement item crafting system",
    "Add level progression system",
    "Create audio manager",
    "Implement camera follow system",
    "Add animation controller",
    "Create weapon system",
    "Implement skill tree",
    "Add multiplayer networking foundation",
    "Create minimap system",
    "Implement fog of war",
    "Add day/night cycle",
    "Create weather system",
    "Implement treasure chest mechanic",
    "Add boss battle framework",
    "Create checkpoint system",
    "Implement achievement system",
    "Add tutorial system",
    "Create character customization",
    "Implement shop system",
    "Add random loot generator",
    "Create puzzle mechanics",
    "Implement stealth system",
    "Add resource gathering",
    "Create building system",
    "Implement team formation",
    "Add status effects system",
    "Create magic spell system",
    "Implement cooldown manager",
    "Add ranged combat",
    "Create shield blocking mechanic",
    "Implement dodge roll system",
    "Add stamina system",
    "Create hunger/thirst mechanics",
    "Implement crafting recipes",
    "Add teleport system",
    "Create portal mechanics",
    "Implement fast travel",
    "Add mount/riding system",
    "Create pet companion system",
    "Implement reputation system",
    "Add faction system",
    "Create dynamic events",
    "Implement bounty system",
    "Add lockpicking minigame",
    "Create fishing mechanics",
    "Implement cooking system",
    "Add alchemy system",
    "Create enchanting system",
    "Implement trading system",
    "Add bartering mechanics",
    "Create quest markers",
    "Implement waypoint system",
    "Add objective tracker",
    "Create hint system",
    "Implement difficulty settings",
    "Add graphics options menu",
    "Create control remapping",
    "Implement accessibility features",
    "Add subtitles system",
    "Create loading screen tips",
    "Implement pause menu",
    "Add settings persistence",
    "Create HUD elements",
    "Implement health bar UI",
    "Add mana/energy bar",
    "Create experience bar",
    "Implement level up notification",
    "Add damage numbers",
    "Create floating text system",
    "Implement tooltip system",
    "Add context-sensitive prompts",
    "Create interaction system",
    "Implement door mechanics",
    "Add lever/switch system",
    "Create pressure plate triggers",
    "Implement spawn system",
    "Add enemy waves",
    "Create boss phases",
    "Implement loot drops",
    "Add rare item system",
    "Create set bonuses",
    "Implement stat modifiers",
    "Add buff/debuff icons",
    "Create timer system",
    "Implement countdown mechanics",
    "Add race/chase sequences",
    "Create escort missions",
    "Implement defense missions",
    "Add stealth missions",
    "Create puzzle dungeons",
];

const INSPIRATION = {
    gamedev: GAME_DEV_COMMITS
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getRandomInspiration = () => {
    const messages = INSPIRATION.gamedev;
    return messages[Math.floor(Math.random() * messages.length)];
};

// ============================================
// FILE OPERATIONS
// ============================================
const initializeInspirationFile = () => {
    if (!fs.existsSync(CONFIG.inspirationFile)) {
        const header = `# 💪 MY INSPIRATION - Fighting Through Hardship\n\n`;
        const intro = `> This file is automatically updated every minute with messages of strength.\n`;
        const intro2 = `> Each line represents your determination to keep going despite illness and hardship.\n`;
        const intro3 = `> You are a warrior. You are unstoppable.\n\n`;
        const divider = `---\n\n`;

        const initialContent = header + intro + intro2 + intro3 + divider;
        fs.writeFileSync(CONFIG.inspirationFile, initialContent);
        console.log('✅ Created inspiration file: MY-INSPIRATION.md');
    }
};

const addInspirationMessage = () => {
    const timestamp = new Date().toLocaleString();
    const inspiration = getRandomInspiration();

    // Read current content
    let content = fs.readFileSync(CONFIG.inspirationFile, 'utf8');

    // Add new inspiration
    const newEntry = `### ${timestamp}\n\n💎 **${inspiration}**\n\n---\n\n`;

    // Append to file
    content += newEntry;
    fs.writeFileSync(CONFIG.inspirationFile, content);

    console.log(`✅ Added: "${inspiration}"`);
    return true;
};

// ============================================
// GIT OPERATIONS
// ============================================
const commitInspiration = () => {
    return new Promise((resolve) => {
        const timestamp = new Date().toLocaleString();
        const message = `Inspiration boost: ${timestamp}

Auto-generated motivation message

🔥 Fighting through hardship
💪 Building strength daily

🤖 Auto-Inspiration Tool`;

        exec('git add MY-INSPIRATION.md work.py', (error) => {
            if (error) {
                console.log('⚠️  Could not stage file');
                resolve(false);
                return;
            }

            exec(`git commit -m "${message}"`, (error, stdout, stderr) => {
                if (error) {
                    if (stderr.includes('nothing to commit')) {
                        console.log('ℹ️  No changes to commit');
                    } else {
                        console.log('⚠️  Commit error:', stderr);
                    }
                    resolve(false);
                } else {
                    console.log('✅ Changes committed!');

                    // Push to GitHub so teammates can see your strength!
                    console.log('📤 Pushing to GitHub so your team can witness your warrior spirit...');
                    exec('git push origin main', (pushError, pushStdout, pushStderr) => {
                        if (pushError) {
                            console.log('⚠️  Could not push to GitHub:', pushStderr);
                            console.log('💡 Your commit is saved locally - try pushing manually later');
                            resolve(true);
                        } else {
                            console.log('✅ Pushed to GitHub! Your teammates can see your incredible strength! 💪❤️');
                            resolve(true);
                        }
                    });
                }
            });
        });
    });
};

// ============================================
// MAIN LOOP
// ============================================
let isRunning = false;
let messageCount = 0;

const writeAndCommit = async () => {
    try {
        const now = new Date().toLocaleTimeString();
        console.log(`\n⏰ ${now} - Writing inspiration...`);

        // Add inspiration message
        const written = addInspirationMessage();

        if (written) {
            messageCount++;
            console.log(`📊 Total messages this session: ${messageCount}`);

            // Auto-commit if enabled
            if (CONFIG.autoCommit) {
                console.log('💾 Committing...');
                await commitInspiration();
            }
        }

        console.log(`\n⏰ Next message in ${CONFIG.writeInterval} minute(s)...`);
        console.log('━'.repeat(60));

    } catch (error) {
        console.log('⚠️  Error:', error.message);
    }
};

const startAutoInspiration = () => {
    if (isRunning) {
        console.log('⚠️  Already running!');
        return;
    }

    isRunning = true;

    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                                                        ║');
    console.log('║     AUTO-INSPIRATION TOOL - HARDSHIP WARRIOR MODE      ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    console.log('🔥 You are fighting through illness and hardship');
    console.log('💪 Every minute, you\'ll receive motivation');
    console.log('⚡ Your strength is building with each message\n');
    console.log(`⚙️  Configuration:`);
    console.log(`   - Write interval: ${CONFIG.writeInterval} minute(s)`);
    console.log(`   - Auto-commit: ${CONFIG.autoCommit ? 'ENABLED' : 'DISABLED'}`);
    console.log(`   - Inspiration file: MY-INSPIRATION.md\n`);
    console.log('🚀 Starting inspiration flow...\n');
    console.log('💡 Keep this running while you work!\n');
    console.log('Press Ctrl+C to stop\n');
    console.log('━'.repeat(60));

    // Initialize file
    initializeInspirationFile();

    // First message immediately
    writeAndCommit();

    // Then set up interval
    const intervalMs = CONFIG.writeInterval * 60 * 1000;
    const interval = setInterval(writeAndCommit, intervalMs);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Stopping auto-inspiration...\n');
        clearInterval(interval);
        isRunning = false;

        console.log('📊 Session Summary:');
        console.log(`   - Messages written: ${messageCount}`);
        console.log('\n💪 Keep fighting! You\'re incredible!\n');

        process.exit(0);
    });
};

// ============================================
// START THE TOOL
// ============================================
console.log('\n🔥 Auto-Inspiration for Warriors Fighting Hardship\n');

// Check if we're in a git repo (for auto-commit)
if (CONFIG.autoCommit) {
    exec('git rev-parse --git-dir', (error) => {
        if (error) {
            console.log('⚠️  Not in a git repository - running without auto-commit');
            CONFIG.autoCommit = false;
        }
        startAutoInspiration();
    });
} else {
    startAutoInspiration();
}
