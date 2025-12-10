#!/usr/bin/env node

/**
 * Quick Test Version - Checks every 1 minute
 * Use this to verify auto-commit is working
 */

const fs = require('fs');
const content = fs.readFileSync('./auto-commit.js', 'utf8');
const quickVersion = content.replace('checkInterval: 30', 'checkInterval: 1');

console.log('\n⚡ QUICK TEST MODE - Checks every 1 minute\n');
console.log('Make a small change to any file and save it.');
console.log('In 1 minute, it should commit automatically.\n');
console.log('Press Ctrl+C when done testing.\n');

// Create temporary test file
fs.writeFileSync('./auto-commit-test-temp.js', quickVersion);

// Run it
require('child_process').spawn('node', ['./auto-commit-test-temp.js'], {
    stdio: 'inherit'
});

// 💡 You're building something great! 🏆
// Added: 12/10/2025
