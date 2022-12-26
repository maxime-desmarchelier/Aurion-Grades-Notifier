const aurionHandler = require('./AurionHandler');
const discordBot = require('./discordBot.js');
const config = require("./config");

let aurion = new aurionHandler();
let disc = new discordBot();

// Checking config file
checkConfig();

// Discord bot login
disc.login().then(() => {
    checkNewGrades();
});

// Array contains the current subjects
let currentSubjects = [];

// Check for new grades every hour
function checkNewGrades() {
    // Get the new subjects list
    aurion.getSubjectList().then((newSubjects) => {
        // Filter the new subjects list to get only the new subjects
        let diffSubjects = newSubjects.filter(n => !currentSubjects.includes(n));
        // If there is new subjects
        if (diffSubjects.length > 0) {
            // If currentSubjects is empty, it means that the bot is starting
            if (currentSubjects.length > 0) {
                disc.sendNewSubjectMessage("Nouvelles notes : " + diffSubjects.join(", "));
            } else {
                disc.sendLogMessage("Initialisation des notes : " + newSubjects.join(", "));
            }
            currentSubjects = newSubjects;
        }
        // Reschedule the function to be called at checkInterval (minutes)
        setTimeout(checkNewGrades, config.extra.checkInterval * 60 * 1000);
    });
}

function checkConfig() {
    if (!config.extra) {
        throw "Missing extra section in config file";
    }
    if (!config.discord) {
        throw "Missing discord section in config file";
    }
    if (!config.credentials) {
        throw "Missing credentials section in config file";
    }
    if (!config.discord.token) {
        throw new Error("Missing discord token");
    }
    if (!config.discord.logChannelId) {
        throw new Error("Missing discord log channel id");
    }
    if (!config.discord.announcementChannelId) {
        throw new Error("Missing discord announcement channel id");
    }
    if (!config.credentials.user) {
        throw new Error("Missing Aurion username");
    }
    if (!config.credentials.password) {
        throw new Error("Missing Aurion password");
    }
    if (!config.extra || !config.extra.checkInterval) {
        console.log("Warning : Missing check interval - Using default value : 60 minutes");
        config['extra'] = {"checkInterval": 60};
    }
}



