

require("dotenv").config();

const { Client, WebhookClient } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN,
);

const PREFIX = "$";

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
     //console.log('The bot has logged in');
});

// RANDOM JOKES 
const jokes = [
    'I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k. It was a trip down Memory Lane.',
    '“Debugging” is like being the detective in a crime drama where you are also the murderer.',
    'The best thing about a Boolean is that even if you are wrong, you are only off by a bit.',
    'A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t.',
    'If you listen to a UNIX shell, can you hear the C?',
    'Why do Java programmers have to wear glasses? Because they don’t C#.',
    'What sits on your shoulder and says “Pieces of 7! Pieces of 7!”? A Parroty Error.',
    'When Apple employees die, does their life HTML5 in front of their eyes?',
    'Without requirements or design, programming is the art of adding bugs to an empty text file.',
    'Before software can be reusable it first has to be usable.',
    'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.',
    'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
    'There are two ways to write error-free programs; only the third one works.',
    'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.',
  ];

  client.on('message', (msg) => {
    if (msg.content === '?joke') {
      msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
    }
  });

client.on('message', (message) => {
    if(message.author.bot === true) return;
    console.log(`[${message.author.tag}]: ${message.content}`);

    

    if(message.content === 'hello'){
       // message.reply('Hello there!');
       message.channel.send('hello');
    }
    else if(message.content === 'hi'){
        // message.reply('Hello there!');
        message.channel.send('hi');
     }
    else if(message.content === 'namaste'){
        // message.reply('Hello there!');
        message.channel.send('namaste');
    }
    else if(message.content === 'bye'){
        // message.reply('Hello there!');
        message.channel.send('bye see you!');
    }




});


client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully');
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
      }
    } else if (CMD_NAME === 'announce') {
      console.log(args);
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '844609133143785503') {
    switch (name) {
      case '🍎':
        member.roles.add('844611254625632276');
        break;
      case '🍌':
        member.roles.add('844611457924202579');
        break;
      case '🍇':
        member.roles.add('844611402794008597');
        break;
      case '🍑':
        member.roles.add('844611338268311560');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '844609133143785503') {
    switch (name) {
      case '🍎':
        member.roles.remove('844611254625632276');
        break;
      case '🍌':
        member.roles.remove('844611457924202579');
        break;
      case '🍇':
        member.roles.remove('844611402794008597');
        break;
      case '🍑':
        member.roles.remove('844611338268311560');
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);


