#!/usr/bin/env node

/**
 * Weekly Progress Report Generator
 * Creates honest summaries of your coding practice
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
    logFile: path.join(__dirname, 'practice-log.json'),
    reportDir: path.join(__dirname, 'reports')
};

// Ensure reports directory exists
if (!fs.existsSync(CONFIG.reportDir)) {
    fs.mkdirSync(CONFIG.reportDir);
}

// Load practice log
const loadLog = () => {
    if (fs.existsSync(CONFIG.logFile)) {
        return JSON.parse(fs.readFileSync(CONFIG.logFile, 'utf8'));
    }
    return { sessions: [], totalHours: 0, currentStreak: 0, longestStreak: 0 };
};

// Filter sessions by date range
const getSessionsInRange = (sessions, daysBack) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    return sessions.filter(session => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= cutoffDate;
    });
};

// Generate statistics
const generateStats = (sessions) => {
    if (sessions.length === 0) {
        return {
            totalSessions: 0,
            totalHours: 0,
            avgSessionLength: 0,
            avgRating: 0,
            topTopics: [],
            activeDays: 0
        };
    }

    const totalMinutes = sessions.reduce((sum, s) => sum + (s.actualTime || 0), 0);
    const totalHours = totalMinutes / 60;
    const avgSessionLength = totalMinutes / sessions.length;
    const avgRating = sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.length;

    // Count topics
    const topicCount = {};
    sessions.forEach(session => {
        session.topics.forEach(topic => {
            topicCount[topic] = (topicCount[topic] || 0) + 1;
        });
    });

    const topTopics = Object.entries(topicCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([topic, count]) => ({ topic, count }));

    // Count unique active days
    const uniqueDays = new Set(
        sessions.map(s => new Date(s.startTime).toDateString())
    );
    const activeDays = uniqueDays.size;

    return {
        totalSessions: sessions.length,
        totalHours: totalHours.toFixed(1),
        avgSessionLength: Math.round(avgSessionLength),
        avgRating: avgRating.toFixed(1),
        topTopics,
        activeDays
    };
};

// Generate markdown report
const generateMarkdownReport = (period, sessions, stats, log) => {
    const now = new Date();
    const reportDate = now.toLocaleDateString();

    let markdown = `# Coding Practice Report - ${period}\n\n`;
    markdown += `**Generated:** ${reportDate}\n\n`;
    markdown += `---\n\n`;

    markdown += `## 📊 Overview\n\n`;
    markdown += `- **Total Sessions:** ${stats.totalSessions}\n`;
    markdown += `- **Total Practice Time:** ${stats.totalHours} hours\n`;
    markdown += `- **Active Days:** ${stats.activeDays}\n`;
    markdown += `- **Average Session Length:** ${stats.avgSessionLength} minutes\n`;
    markdown += `- **Average Session Rating:** ${stats.avgRating}/5 ⭐\n`;
    markdown += `- **Current Streak:** ${log.currentStreak} days 🔥\n`;
    markdown += `- **Longest Streak:** ${log.longestStreak} days\n\n`;

    markdown += `---\n\n`;

    markdown += `## 🎯 Top Topics\n\n`;
    if (stats.topTopics.length > 0) {
        stats.topTopics.forEach((item, index) => {
            markdown += `${index + 1}. **${item.topic}** - ${item.count} session${item.count > 1 ? 's' : ''}\n`;
        });
    } else {
        markdown += `No topics logged yet.\n`;
    }
    markdown += `\n`;

    markdown += `---\n\n`;

    markdown += `## 📝 Session Details\n\n`;
    if (sessions.length > 0) {
        sessions.reverse().forEach(session => {
            const date = new Date(session.startTime).toLocaleDateString();
            const time = new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            markdown += `### ${date} at ${time}\n\n`;
            markdown += `**Goal:** ${session.goal}\n\n`;
            markdown += `**Topics:** ${session.topics.join(', ')}\n\n`;
            markdown += `**Duration:** ${session.actualTime || 0} minutes\n\n`;
            markdown += `**Rating:** ${'⭐'.repeat(session.rating || 0)}\n\n`;

            if (session.accomplished) {
                markdown += `**Accomplished:**\n${session.accomplished}\n\n`;
            }

            if (session.learnings) {
                markdown += `**Key Learnings:**\n${session.learnings}\n\n`;
            }

            if (session.challenges) {
                markdown += `**Challenges:**\n${session.challenges}\n\n`;
            }

            markdown += `---\n\n`;
        });
    } else {
        markdown += `No sessions logged in this period.\n\n`;
    }

    markdown += `## 💪 Keep Going!\n\n`;
    markdown += `Every session counts. Keep building your skills with consistent, genuine practice.\n\n`;
    markdown += `*This report reflects actual coding practice sessions.*\n`;

    return markdown;
};

// Main function
const main = () => {
    console.log('\n📈 Generating Practice Reports...\n');

    const log = loadLog();

    // Generate different period reports
    const reports = [
        { name: 'Weekly Report', days: 7, filename: 'weekly-report.md' },
        { name: 'Monthly Report', days: 30, filename: 'monthly-report.md' },
        { name: 'All Time', days: Infinity, filename: 'all-time-report.md' }
    ];

    reports.forEach(report => {
        const sessions = report.days === Infinity
            ? log.sessions
            : getSessionsInRange(log.sessions, report.days);

        const stats = generateStats(sessions);
        const markdown = generateMarkdownReport(report.name, sessions, stats, log);

        const filepath = path.join(CONFIG.reportDir, report.filename);
        fs.writeFileSync(filepath, markdown);

        console.log(`✅ ${report.name} generated: ${filepath}`);
        console.log(`   Sessions: ${stats.totalSessions} | Hours: ${stats.totalHours}\n`);
    });

    console.log('🎉 All reports generated successfully!\n');
};

main();
