const aurionHandler = require('./AurionHandler');
const discordBot = require('./discordBot.js');
const config = require("./config");
const HealthcheckService = require('./HealthcheckService');

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
        setTimeout(checkNewGrades, config.extra.refreshRate * 60 * 1000);
        HealthcheckService.reportSuccess(config.extra.healthCheckUuid);
    }).catch((err) => {
        console.log(err);
        setTimeout(checkNewGrades, config.extra.refreshRate * 60 * 1000);
        HealthcheckService.reportFail(config.extra.healthCheckUuid);
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
        throw new Error("Missing Aurion username : \n AURION_USER=your_username\n AURION_PASSWORD=your_password");
    }
    if (!config.credentials.password) {
        throw new Error("Missing Aurion password : \n AURION_PASSWORD=your_password");
    }
    if (!config.extra.refreshRate) {
        console.log("Warning : Missing refreshRate - Using default value : 60 minutes");
        config['extra'] = {"refreshRate": 60};
    }
}



