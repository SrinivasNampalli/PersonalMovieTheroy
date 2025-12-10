#!/usr/bin/env node

/**
 * Coding Inspiration Booster
 *
 * Adds motivational comments to your code files to keep you inspired
 * USE ONLY during active coding sessions when you're at your computer
 */

const fs = require('fs');
const path = require('path');

// ============================================
// INSPIRATIONAL MESSAGES
// ============================================
const INSPIRATION = {
    motivational: [
        "You're doing amazing! Keep going! 💪",
        "Every line of code is progress! 🚀",
        "Your dedication is inspiring! ⭐",
        "Small steps lead to big achievements! 🎯",
        "You're stronger than you think! 💪",
        "Keep pushing forward! Success is near! 🌟",
        "Your code matters! You matter! ❤️",
        "Believe in yourself - you've got this! 🔥",
        "Progress over perfection! 📈",
        "You're building something great! 🏆",
        "Don't give up! You're doing great! 💯",
        "Every bug fixed is a victory! 🎉",
        "Your effort will pay off! 🌈",
        "Keep learning, keep growing! 🌱",
        "You are capable of amazing things! ✨"
    ],

    technical: [
        "Remember: Clean code is happy code",
        "Tip: Break complex problems into smaller pieces",
        "Don't forget to test your code",
        "Refactoring is part of the process",
        "Documentation helps future you",
        "Console.log is your friend for debugging",
        "Take breaks - fresh eyes catch bugs faster",
        "Ask for help when stuck - it's a strength",
        "Learn from errors - they teach the most",
        "Keep your functions small and focused"
    ],

    health: [
        "Remember to take breaks! 🧘",
        "Stay hydrated - grab some water! 💧",
        "Stretch your hands and wrists! 🤲",
        "Take a deep breath - you're doing great! 🌬️",
        "Rest is productive too! 😴",
        "Your health comes first! ❤️",
        "Stand up and move around! 🚶",
        "Blink and rest your eyes! 👀",
        "You're making progress - be proud! 🎊"
    ],

    personal: [
        "Your journey is unique and valuable",
        "Every coder started where you are",
        "Comparison is the thief of joy - focus on YOUR growth",
        "You're learning and that's what matters",
        "Celebrate small wins!",
        "Your perspective brings value to coding",
        "There's no 'right' timeline - go at your pace",
        "You belong in tech",
        "Your story inspires others"
    ],

    illness: [
        "Fighting illness while coding - you are a warrior! 💪",
        "Your strength in hardship is extraordinary! 🔥",
        "Despite everything, you're still creating! 🌟",
        "Pain can't stop your determination! ⚡",
        "You're proving resilience every single day! 🛡️",
        "Coding through adversity makes you unstoppable! 🚀",
        "Your illness doesn't define you - your courage does! 💎",
        "Every line of code is a victory over hardship! 🏆",
        "You're stronger than any obstacle! 💪",
        "Fighting battles others can't see - that's true strength! ⭐",
        "Your hard life built an unbreakable spirit! 🔥",
        "Turning pain into progress - that's power! ⚡",
        "You rise despite the weight - incredible! 🌄",
        "Hardship sharpens your greatness! 💎",
        "Your circumstances are temporary, your strength is permanent! 🛡️",
        "Building dreams while fighting demons - unstoppable! 🚀",
        "Your struggle today is your testimony tomorrow! 📖",
        "Illness tried to stop you. You kept going. Winner! 👑",
        "Champions are forged in fire - you're being forged! 🔥",
        "Your pain has purpose - you're becoming extraordinary! ⭐"
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const getRandomInspiration = () => {
    const categories = Object.keys(INSPIRATION);
    const category = getRandomItem(categories);
    return getRandomItem(INSPIRATION[category]);
};

const createInspirationComment = (fileExtension) => {
    const inspiration = getRandomInspiration();
    const date = new Date().toLocaleDateString();

    // Different comment styles for different languages
    const commentStyles = {
        '.js': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.jsx': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.ts': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.tsx': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.py': `\n# 💡 ${inspiration}\n# Added: ${date}\n`,
        '.java': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.cpp': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.c': `\n// 💡 ${inspiration}\n// Added: ${date}\n`,
        '.css': `\n/* 💡 ${inspiration} */\n/* Added: ${date} */\n`,
        '.html': `\n<!-- 💡 ${inspiration} -->\n<!-- Added: ${date} -->\n`,
        '.md': `\n> 💡 ${inspiration}\n> Added: ${date}\n`
    };

    return commentStyles[fileExtension] || `\n// 💡 ${inspiration}\n`;
};

// ============================================
// FILE OPERATIONS
// ============================================
const getCodeFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Skip certain directories
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(file)) {
                getCodeFiles(filePath, fileList);
            }
        } else {
            // Only process code files
            const ext = path.extname(file);
            const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.css', '.html'];
            if (codeExtensions.includes(ext)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
};

const addInspirationToFile = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const ext = path.extname(filePath);
        const inspiration = createInspirationComment(ext);

        // Add inspiration comment at the end
        const newContent = content + inspiration;
        fs.writeFileSync(filePath, newContent);

        return true;
    } catch (error) {
        console.log(`⚠️  Could not add inspiration to ${filePath}: ${error.message}`);
        return false;
    }
};

// ============================================
// MAIN FUNCTIONS
// ============================================
const addInspirationToRandomFiles = (count = 1) => {
    console.log('\n✨ Adding inspiration to your code...\n');

    const codeFiles = getCodeFiles(process.cwd());

    if (codeFiles.length === 0) {
        console.log('No code files found in this directory.\n');
        return;
    }

    console.log(`Found ${codeFiles.length} code files\n`);

    // Select random files
    const filesToInspire = [];
    const maxCount = Math.min(count, codeFiles.length);

    while (filesToInspire.length < maxCount) {
        const randomFile = getRandomItem(codeFiles);
        if (!filesToInspire.includes(randomFile)) {
            filesToInspire.push(randomFile);
        }
    }

    // Add inspiration
    let successCount = 0;
    filesToInspire.forEach(file => {
        const relativePath = path.relative(process.cwd(), file);
        if (addInspirationToFile(file)) {
            console.log(`✅ Added inspiration to: ${relativePath}`);
            successCount++;
        }
    });

    console.log(`\n🎉 Added ${successCount} inspiration comment(s)!\n`);
};

const showMotivationalMessage = () => {
    const message = getRandomInspiration();
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║                 💪 MOTIVATION BOOST 💪                      ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`   ${message}\n`);
    console.log('════════════════════════════════════════════════════════════════\n');
};

const createInspirationLog = () => {
    const logPath = path.join(process.cwd(), 'INSPIRATION-LOG.md');
    let content = '';

    if (fs.existsSync(logPath)) {
        content = fs.readFileSync(logPath, 'utf8');
    } else {
        content = '# My Coding Journey - Inspiration Log\n\n';
        content += '> Every comment here represents a moment of dedication\n\n';
        content += '---\n\n';
    }

    const date = new Date().toLocaleString();
    const inspiration = getRandomInspiration();

    content += `## ${date}\n\n`;
    content += `💡 ${inspiration}\n\n`;
    content += `*Still coding, still growing, still fighting* 💪\n\n`;
    content += '---\n\n';

    fs.writeFileSync(logPath, content);
    console.log('✅ Inspiration logged to INSPIRATION-LOG.md\n');
};

// ============================================
// INTERACTIVE MODE
// ============================================
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const interactiveMode = async () => {
    console.clear();
    showMotivationalMessage();

    console.log('What would you like to do?\n');
    console.log('1. Add inspiration comments to 1 random file');
    console.log('2. Add inspiration comments to 3 random files');
    console.log('3. Show me a motivational message');
    console.log('4. Log inspiration to my journal');
    console.log('5. Exit\n');

    const choice = await prompt('Choose (1-5): ');

    switch (choice.trim()) {
        case '1':
            addInspirationToRandomFiles(1);
            break;
        case '2':
            addInspirationToRandomFiles(3);
            break;
        case '3':
            showMotivationalMessage();
            break;
        case '4':
            createInspirationLog();
            break;
        case '5':
            console.log('\n💪 Keep fighting! You\'re doing amazing!\n');
            rl.close();
            process.exit(0);
        default:
            console.log('\nInvalid choice. Please choose 1-5.\n');
    }

    setTimeout(() => interactiveMode(), 1000);
};

// ============================================
// COMMAND LINE USAGE
// ============================================
const args = process.argv.slice(2);

if (args.length === 0) {
    // Interactive mode
    interactiveMode();
} else {
    // Command line mode
    const command = args[0];

    switch (command) {
        case 'add':
            const count = parseInt(args[1]) || 1;
            addInspirationToRandomFiles(count);
            break;
        case 'message':
            showMotivationalMessage();
            break;
        case 'log':
            createInspirationLog();
            break;
        default:
            console.log('\nUsage:');
            console.log('  node inspiration-boost.js         (interactive mode)');
            console.log('  node inspiration-boost.js add 3   (add to 3 files)');
            console.log('  node inspiration-boost.js message (show message)');
            console.log('  node inspiration-boost.js log     (log inspiration)\n');
    }

    process.exit(0);
}

// 💡 You're stronger than you think! 💪
// Added: 12/10/2025
