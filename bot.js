const Discord = require('discord.js');
const { config } = require("dotenv");
const { promptMessage } = require("./functions");

const client = new Discord.Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {
    console.log(client.user.tag + " jest gotowy do akcji!");

    client.user.setActivity({name: "Kergi :p", type: "STREAMING", url: "https://www.twitch.tv/kergitv"});
});

client.on("messageReactionAdd", async (reaction, user) => {
    
    if (reaction.message.partial) await reaction.message.fetch(); 
    if (reaction.partial) await reaction.fetch();
    
    if (user.bot) return;
    if (!reaction.message.guild) return; 
    if (reaction.message.guild.id !== "531630990691532821") return; 
    if (reaction.message.guild.members.chace.get(user.id).roles.has("531856634406764544")) return;
    
    if (reaction.message.channel.id === "582478995724173323") { // This is a #self-roles channel.
      if (reaction.emoji.name === "☑️") {
        await reaction.message.guild.members.cache.get(user.id).roles.add("531856634406764544") 
          return
      }
      
    } else {
      return; 
    }
  })


client.login(process.env.TOKEN);
