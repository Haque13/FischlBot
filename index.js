const { Discord, Client, Util, MessageEmbed } = require("discord.js");
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
    
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(PREFIX.length);

    if (message.content.startsWith(PREFIX + 'avatar')) {
    
        let embed = new MessageEmbed();
    if(!message.mentions.users.first()) {
        embed.setTitle('Your avatar');
        embed.setDescription('Aku memanggil nya dari alam kegelapan')(`Links:\n[png](${message.author.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${message.author.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${message.author.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${message.author.displayAvatarURL({format: "webp", size: 2048})})`);
        embed.setColor(0x00008b);
        embed.setTimestamp();
        embed.setFooter(message.author.username);
        embed.setImage(message.author.displayAvatarURL({size: 2048, dynamic: true}));
        message.channel.send(embed);
    } else {
        let user = message.mentions.users.first();
        embed.setTitle(`${user.username}'s avatar`);
        embed.setDescription(`Links:\n[png](${user.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${user.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${user.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${user.displayAvatarURL({format: "webp", size: 2048})})`);
        embed.setColor(0x8b0000);
        embed.setTimestamp();
        embed.setFooter(user.username);
        embed.setImage(bot.users.cache.get(user.id).displayAvatarURL({size: 2048, dynamic: true}));
        message.channel.send(embed)};
    } else {
        message.channel.send("Maaf, aku tidak mempunyai cukup kekuatan untuk memanggil orang itu")
}
})

bot.login(process.env.BOT_TOKEN);