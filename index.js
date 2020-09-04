const { Discord, Client, Util, MessageEmbed } = require("discord.js");
require("dotenv").config();

const bot = new Client({
    disableMentions: "all"
});

let countChannel = {
    total: "751436186966425720",
    member: "751436248505122836",
    bots: "751436334929018960",
    serverID: "645116221007593502"
}

bot.on("guildMemberAdd"), member => {
    if (member.guild.id !== countChannel.serverID) return;

    bot.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
    bot.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m =>!m.user.bot).size}`);
    bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
}

bot.on("guildMemberRemove"), member => {
    if (member.guild.id !== countChannel.serverID) return;

    bot.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
    bot.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m =>!m.user.bot).size}`);
    bot.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
}

const prefix1 = "fischl";
const prefix2 = "oz";

bot.on("ready", () => {
    console.log(`[READY] ${bot.user.tag} has been successfully booted up!`)
    bot.user.setActivity("YOU from the dark! 💜",{ type: 'WATCHING' })
  });
bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("shardDisconnect", (event, id) => console.log(`[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`));
bot.on("shardReconnecting", (id) => console.log(`[SHARD] Shard ${id} reconnecting...`));
bot.on("message", async (message) => { // eslint-disable-line
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix1 || prefix2)) return;

    const args = message.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    
        
        let embed = new MessageEmbed(); {
    if (!message.mentions.users.first()) { 
         message.channel.send("Aku tidak bisa melakukan pemanggilan, jika tidak mengetahui siapa yg harus ku panggil!")       
}  else {
        let user = (message.mentions.users.first());
        embed.setTitle(`${user.username}'s avatar`);
        embed.setDescription('Dengan kontrak ini, aku panggil Avatar ini dari dalam kegelapan!') || (`Links:\n[png](${user.displayAvatarURL({format: "png", size: 4096})}) | [jpg](${user.displayAvatarURL({format: "jpg", size: 4096})}) | [gif](${user.displayAvatarURL({format: "gif", size: 4096, dynamic: true})}) | [webp](${user.displayAvatarURL({format: "webp", size: 4096})})`);
        embed.setColor(0x4B0082);
        embed.setTimestamp();
        embed.setFooter(user.username);
        embed.setImage(bot.users.cache.get(user.id).displayAvatarURL({size: 4096, dynamic: true}));
        message.channel.send(embed);
    }    
}})

bot.login(process.env.BOT_TOKEN);