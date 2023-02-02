const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const config = require("./config");
const fs = require('node:fs');
const path = require('node:path');

class DiscordBot {
    constructor() {
        this.client = new Client({intents: [GatewayIntentBits.Guilds]});
        
        this.client.commands = new Collection();
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            this.client.commands.set(command.data.name, command);
        }

        this.client.once(Events.ClientReady, () => {
            console.log('Ready!');
        });

        this.client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = this.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
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

