const { Client, Util, MessageEmbed } = require("discord.js");
require("dotenv").config();

const bot = new Client({
    disableMentions: "all"
});

const PREFIX = "f";

bot.on("ready", () => {
    console.log(`[READY] ${bot.user.tag} has been successfully booted up!`)
    bot.user.setActivity("in the darkness!")
  });
bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("shardDisconnect", (event, id) => console.log(`[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`));
bot.on("shardReconnecting", (id) => console.log(`[SHARD] Shard ${id} reconnecting...`));
bot.on("message", async (message) => { // eslint-disable-line
  if (message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(PREFIX)) return;

  const args = message.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(message.guild.id);

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);
  
  if (command === 'avatar') {
    if (args[0]) {
      const user = getUserFromMention(args[0]);
      if (!user) {
        return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
      }
  
      return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    }
  
    return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
  }
})

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}


bot.login(process.env.BOT_TOKEN);
