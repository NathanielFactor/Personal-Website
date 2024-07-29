// app.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const { aiResponse } = require('./bot/openai'); // Import the aiResponse function
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Database connection function
function getDbConnection() {
  const db = new sqlite3.Database('db/Conversations.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return db;
}

// Retrieve messages from the database
function retrieveMessages(callback) {
  const db = getDbConnection();
  const sql = 'SELECT Messages FROM CONVERSATIONS';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    const messagesList = rows.map((row) => row.Messages);
    callback(messagesList);
  });
  db.close();
}

// Retrieve usernames from the database
function retrieveUsernames(callback) {
  const db = getDbConnection();
  const sql = 'SELECT UserName FROM CONVERSATIONS';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    const usernamesList = rows.map((row) => row.UserName);
    callback(usernamesList);
  });
  db.close();
}

// Express routes
app.get('/api/messages', (req, res) => {
  retrieveMessages((messages) => {
    res.json(messages);
  });
});

app.get('/api/usernames', (req, res) => {
  retrieveUsernames((usernames) => {
    res.json(usernames);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Run the Discord bot
function runDiscordBot() {
  const token = process.env.TOKEN;
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.once('ready', () => {
    console.log(`${client.user.tag} is now running!`);
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const username = message.author.tag;
    const channel = message.channel.name;
    let command = null;
    let userMessage = null;

    ['/ai', '/bot', '/chizuru', 'mizuhara', '/shutdown', '/dm'].forEach((text) => {
      if (message.content.startsWith(text)) {
        command = message.content.split(' ')[0];
        userMessage = message.content.replace(text, ' ');
      }
    });

    if (username === '_c0bra' && command === '/shutdown') {
      process.exit();
    }

    console.log(`${username} said: '${command}' '${userMessage}' (${channel})`);

    if (command && ['/ai', '/bot', '/chizuru', 'mizuhara'].includes(command)) {
      const botResponse = await aiResponse(userMessage);
      message.channel.send(botResponse);
    }
  });

  client.login(token);
}

runDiscordBot();
