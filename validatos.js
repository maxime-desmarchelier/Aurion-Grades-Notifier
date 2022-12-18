const aurionHandler = require('./AurionHandler');
const discordBot = require('./discordBot.js');

let aurion = new aurionHandler();
let disc = new discordBot();

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
        // Reschedule the function to be called in 1 hour
        setTimeout(checkNewGrades, 3600000);
    });
}



