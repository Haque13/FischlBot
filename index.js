const { Discord, Client, Util, MessageEmbed } = require("discord.js");
require("dotenv").config();

const bot = new Client({
    disableMentions: "all"
});

const prefix1 = "f";
const prefix2 = "fischl";
const count = new Commando.Client({commandPrefix: '$'});
const guild = count.guilds.get("691557706846306385");
const MIN_INTERVAL = 3 * 1000;

bot.registry.registerGroup('connectc', 'Connectc');
bot.registry.registerGroup('defaultc', 'Defaultc');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")


bot.on("ready", () => {
    console.log(`[READY] ${bot.user.tag} has been successfully booted up!`)
    bot.user.setActivity("in the darkness!")
    setInterval(function(){
        var memberCount = guild.members.filter(member => !member.user.bot).size;
        var memberCountChannel = count.channels.get("751113088174129182");
        memberCountChannel.setName("👤Haque: "+ memberCount +" 👤");
    }, MIN_INTERVAL);
  });
bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("shardDisconnect", (event, id) => console.log(`[SHARD] Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect...`));
bot.on("shardReconnecting", (id) => console.log(`[SHARD] Shard ${id} reconnecting...`));
bot.on("message", async (message) => { // eslint-disable-line
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix1)) return;

    const args = message.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix1.length);

    if (message.content.startsWith(prefix1 + 'avatar') || message.content.startsWith(prefix2 + 'avatar'));
        {
        let embed = new MessageEmbed();
    if(!message.mentions.users.first()) {
        message.channel.send("Maaf, aku tidak mempunyai cukup kekuatan untuk memanggil Avatar orang itu")
    } else {
        let user = message.mentions.users.first();
        embed.setTitle(`${user.username}'s avatar`);
        embed.setDescription('Dengan kontrak ini, aku panggil Avatar ini dari dalam kegelapan!') | (`Links:\n[png](${user.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${user.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${user.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${user.displayAvatarURL({format: "webp", size: 2048})})`);
        embed.setColor(0x4B0082);
        embed.setTimestamp();
        embed.setFooter(user.username);
        embed.setImage(bot.users.cache.get(user.id).displayAvatarURL({size: 2048, dynamic: true}));
        message.channel.send(embed);
    }    
}})

bot.login(process.env.BOT_TOKEN);