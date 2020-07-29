const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Debug env loading
console.log(`Env Username: ${process.env.BOT_USERNAME} OAUTH: ${process.env.OAUTH_TOKEN}`);
console.log(`Stored as username: ${opts.identity.username} password: ${opts.identity.password}`)

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  console.log(`${target}: ${msg}`);
  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it

  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}. Link: https://glitch.com/~twitch-chatbot`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!test') {
    client.say(target, `I am listening`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!base') {
    client.say(target, `All your base are belong to us!`);
    console.log(`* Ececuted ${commandName} command`);
  } else {
    //console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}