const {SlashCommandBuilder} = require('discord.js');
const HealthcheckService = require('../HealthcheckService');
const config = require("../config");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('healthcheck')
        .setDescription('Check if the bot is alive'),
    async execute(interaction) {
        HealthcheckService.reportSuccess(config.extra.healthCheckUuid);
        return interaction.reply('I am alive!');
    },
};