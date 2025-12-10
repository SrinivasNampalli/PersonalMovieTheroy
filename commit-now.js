#!/usr/bin/env node

/**
 * One-time commit script
 * Commits your current work immediately with an auto-generated message
 */

const { exec } = require('child_process');
const path = require('path');

console.log('\n╔════════════════════════════════════════╗');
console.log('║  COMMITTING YOUR WORK NOW              ║');
console.log('╚════════════════════════════════════════╝\n');

const checkGitStatus = () => {
    return new Promise((resolve, reject) => {
        exec('git status --porcelain', (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            const lines = stdout.trim().split('\n').filter(line => line.length > 0);
            const files = lines.map(line => line.substring(3).trim());
            resolve(files);
        });
    });
};

const commitChanges = () => {
    return new Promise((resolve, reject) => {
        exec('git add .', (error) => {
            if (error) {
                reject(error);
                return;
            }

            const timestamp = new Date().toLocaleString();
            const message = `Progress update

Working session completed

⏰ Committed: ${timestamp}

🤖 Accessible Auto-Commit Tool`;

            exec(`git commit -m "${message}"`, (error, stdout, stderr) => {
                if (error) {
                    if (stderr.includes('nothing to commit')) {
                        console.log('ℹ️  No changes to commit\n');
                        resolve(false);
                    } else {
                        console.log('⚠️  Error:', stderr);
                        reject(error);
                    }
                } else {
                    console.log('✅ SUCCESS! Your work has been committed\n');
                    console.log(stdout);
                    resolve(true);
                }
            });
        });
    });
};

const main = async () => {
    try {
        console.log('🔍 Checking for changes...\n');

        const files = await checkGitStatus();

        if (files.length === 0) {
            console.log('ℹ️  No changes found to commit\n');
            return;
        }

        console.log(`📝 Found ${files.length} changed file(s)\n`);

        console.log('💾 Committing...\n');
        await commitChanges();

        console.log('✨ Done!\n');

    } catch (error) {
        console.log('❌ Error:', error.message, '\n');
        process.exit(1);
    }
};

main();
