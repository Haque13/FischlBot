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
        if (member.guild.id !== countChannel.serverID) return;
        client.channels.cache.get(countChannel.traveler).setName(`Travelers: ` + member.guild.roles.cache.get(roleID.Traveler).members.size);
        client.channels.cache.get(countChannel.outlander).setName(`Outlanders: ` + member.guild.roles.cache.get(roleID.Outlanders).members.size);
  }, 1000 * 60 * 1);
});

let countChannel = {
    total: "751687607859281930",
    traveler: "751687686338641931",
    bots: "751687744815759413",
    FCBT: "751711276379406417",
    CBT2: "751718102097592412",
    outlander: "751719923738214480",
    serverID: "691557706846306385"
}
let roleID = {
    FCBT: "725413894990069872",
    CBT2: "691560366047756369",
    Traveler: "691558060820529162",
    Outlanders: "746965972501659680",
    Android: "691563805741678612",
    iOS: "691563744194461726",
    PC: "691563805729357844",
    PS4: "717784756531757077",
    Switch: "717836707281502398"
}
client.on("guildMemberAdd", member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.traveler).setName(`Travelers: ` + member.guild.roles.cache.get(roleID.Traveler).members.size);
    client.channels.cache.get(countChannel.outlander).setName(`Outlanders: ` + member.guild.roles.cache.get(roleID.Outlanders).members.size);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)
    client.channels.cache.get(countChannel.FCBT).setName(`Final CBT: ` + member.guild.roles.cache.get(roleID.FCBT).members.size);
    client.channels.cache.get(countChannel.CBT2).setName(`CBT2: ` + member.guild.roles.cache.get(roleID.CBT2).members.size);
})
client.on("guildMemberRemove", member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`Total Members: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.traveler).setName(`Travelers: ` + member.guild.roles.cache.get(roleID.Traveler).members.size);
    client.channels.cache.get(countChannel.outlander).setName(`Outlanders: ` + member.guild.roles.cache.get(roleID.Outlanders).members.size);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)
    client.channels.cache.get(countChannel.FCBT).setName(`Final CBT: ` + member.guild.roles.cache.get(roleID.FCBT).members.size);
    client.channels.cache.get(countChannel.CBT2).setName(`CBT2: ` + member.guild.roles.cache.get(roleID.CBT2).members.size);
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