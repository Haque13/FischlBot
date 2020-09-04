const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const prefix1 = "fischl";
const prefix2 = "oz";

client.on("ready", () => {
    console.log(`[READY] ${client.user.tag} has been successfully booted up!`)
    setInterval(() => {
        targetGuild = client.guilds.cache.get('691557706846306385')
        if(targetGuild) {
            client.user.setPresence({ game: { name: targetGuild.memberCount + ' people verifying!', type: 'WATCHING' }, status: 'online'  })
                  .then(console.log)
                  .catch(console.error);
        }
  }, 1000 * 60 * 5);
});
client.on('guildMemberAdd', member => {
    let myGuild = client.guilds.cache.get('691557706846306385');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('751471565689979051');
    memberCountChannel.setName('Members: ' + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
})
client.on('guildMemberRemove', member => {
    let myGuild = client.guilds.cache.get('691557706846306385');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get('751471565689979051');
    memberCountChannel.setName('Members: ' + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
})
client.on("warn", console.warn);
client.on("error", console.error);
client.on("shardDisconnect", (event, id) => console.log(`[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`));
client.on("shardReconnecting", (id) => console.log(`[SHARD] Shard ${id} reconnecting...`));
client.on("message", async (message) => { // eslint-disable-line
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
        embed.setImage(client.users.cache.get(user.id).displayAvatarURL({size: 4096, dynamic: true}));
        message.channel.send(embed);
    }    
}})

client.login(process.env.BOT_TOKEN);