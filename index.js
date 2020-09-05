const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const prefix1 = "fischl";
const prefix2 = "oz";

client.on("ready", () => {
    console.log(`[READY] ${client.user.tag} has been successfully booted up!`)
    setInterval(() => {
        let myGuild = client.guilds.cache.get('691557706846306385');
        let memberCount = myGuild.memberCount;
        if(myGuild.available) {
            client.user.setPresence({ activity: { name: memberCount + ' people from the dark! 💜', type: 'WATCHING' }, status: 'online'  })
                  .then(console.log)
                  .catch(console.error);
        }
  }, 1000 * 60 * 1);
});

let countChannel = {
    total: "751680646358892595",
    member: "751680546450571303",
    bots: "751680780601917473",
    serverID: "691557706846306385"
}
client.on('guildMemberAdd', member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`Travelers: ${member.guild.members.cachel.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})
client.on('guildMemberRemove', member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`Travelers: ${member.guild.members.cachel.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})
client.on("warn", console.warn);
client.on("error", console.error);
client.on("shardDisconnect", (event, id) => console.log(`[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`));
client.on("shardReconnecting", (id) => console.log(`[SHARD] Shard ${id} reconnecting...`));
client.on("message", async (message) => { // eslint-disable-line
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix1 + ' avatar'))
    if (!message.content.toLowerCase().startsWith(prefix2 + ' avatar')) return;
        
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
        embed.setImage(client.users.cache.get(user.id).displayAvatarURL({size: 4096, dynamic: true}));
        message.channel.send(embed);
    }    
}})

client.login(process.env.BOT_TOKEN);