const {Client, Events, GatewayIntentBits} = require('discord.js');
const config = require("./config");

class DiscordBot {
    constructor() {
        this.client = new Client({intents: [GatewayIntentBits.Guilds]});
        this.client.once(Events.ClientReady, c => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });
    }

    async login() {
        await this.client.login(config.discord.token).then(() => {
            console.log("Validatos : Logged in");
        });
    }

    sendLogMessage(message) {
        this.client.channels.fetch(config.discord.logChannelId).then((channel) => {
            // If channel is null, it means that the channel id is not valid
            if (channel == null) {
                throw new Error("Invalid channel id");
            } else {
                channel.send(message);
            }
        });
    }

    sendNewSubjectMessage(subjects) {
        this.client.channels.fetch(config.discord.announcementChannelId).then((channel) => {
            if (channel == null) {
                throw new Error("Invalid channel id");
            } else {
                channel.send(subjects);
            }
        });
    }
}


module.exports = DiscordBot;

