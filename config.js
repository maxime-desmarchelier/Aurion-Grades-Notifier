require('dotenv').config();

let config = {
    "credentials": {
        "user": process.env.AURION_USER, "password": process.env.AURION_PASSWORD
    },
    "discord": {
        "token": "DISCORD_TOKEN",
        "logChannelId": "DISCORD_BOT_CHANNEL_ID",
        "announcementChannelId": "DISCORD_BOT_ANNOUNCEMENT_CHANNEL_ID"
    },
    "extra": {
        "refreshRate": 60
    }
};

module.exports = config;