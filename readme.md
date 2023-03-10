<!-- PROJECT LOGO -->
<br />
<div>
  <p align="center">
    <img src="images/logo.png" alt="Logo" width="134" height="134">
  </p>

<h3 align="center">Validatos : Aurion-Web Grades Scraping</h3>

</div>


<!-- ABOUT THE PROJECT -->

## About The Project

Aurion is an ERP (Enterprise Resource Planning) developed by Auriga and used by the students of ENSIIE (École Nationale
Supérieure d'Informatique pour l'Industrie et l'Entreprise). It allows them to access their schedules, notes and other
important information.

The project aims to notify users when a new note is available on Aurion-Web. To do so, it uses Puppeteer to simulate a
user's action and DiscordJS to publish an announcement in a Discord channel.

<img alt="Program's structure" src="images/structure.png">

## Getting Started

### Prerequisites

* NodeJS : https://nodejs.org/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/maxime-desmarchelier/Validatos.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your credentials in `config.js`
   ```json
   {"credentials": {
        "user": "AurionWebUser", "password": "AurionWebPassword"
    }
   }
   ```
   or use environment variables
   ```sh
   AURION_USER=AurionWebUser AURION_PASSWORD=AurionWebPassword
   ```
4. Enter Discord information in `config.js`

   _You will have to set up a Discord bot and get its token.
   Tutorial [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)._

   _You can find the channel ID by enabling developer mode in Discord and right-clicking on the channel you want to use_
   ```json
   {
     "discord": {
       "token": "DISCORD_TOKEN",
       "logChannelId": "DISCORD_BOT_CHANNEL_ID",
       "announcementChannelId": "DISCORD_BOT_ANNOUNCEMENT_CHANNEL_ID"
     }
   }
   ```
5. (Optional) Enter Extra information in `config.js`

   _You may want to change the default refresh rate (in minutes)_
   ```json
   {
     "extra": {
       "refreshRate": 60
     }
   }
   ```
   _You may want to use healthchecks.io API_
   ```json
   {
     "extra": {
       "healthCheckUuid": "UUID",
       "healthCheckApiKey": "API_KEY"
     }
   }
   ```
