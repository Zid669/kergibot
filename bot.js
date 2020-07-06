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
    // If a message gains a reaction and it is uncached, fetch and cache the message.
    // You should account for any errors while fetching, it could return API errors if the resource is missing.
    if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
    if (reaction.partial) await reaction.fetch();
    
    if (user.bot) return; // If the user was a bot, return.
    if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
    if (reaction.message.guild.id !== "531630990691532821") return;
    
    
    if (reaction.message.channel.id === "582478995724173323") { // This is a #self-roles channel.
      if (reaction.emoji.name === "☑️") {
        await reaction.message.guild.members.cache.get(user.id).roles.add("531856634406764544") 
      }
      
    } else {
      return; 
    }
  })

client.on("messageReactionRemove", async (reaction, user) => {
  
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "53163099069153282") return;
  
  if (reaction.message.channel.id === "582478995724173323") {
    if (reaction.emoji.name === "☑️") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("531856634406764544") 
    } else {
    return;
  }
      
  }
})

client.on("message", async  message => {
    
    const prefix = "k!"
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    

    if (message.content === prefix + "test"){

        if (message.author.id === "400801854608637953"){
      const embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL({format: "png", dynamic: true}));
      embed.setTitle("Nasz Regulamin!");
      embed.setDescription(`Witaj na serwerze poświęconym działalności KergiTV, oto kilka zasad których powinniśmy przestrzegać żeby wszystkim nam żyło się tutaj dobrze:
      - 1. Respektuj ToS discorda
      - 2. Respektuj innych - Mowa nienawiści, rasizm, dramy, rozmowy o polityce, trollowanie, każda forma spamu będzie karana.
      - 3. Zachowuj temat rozmowy do odpowiedniego kanału.
      - 4. Nie reklamuj się/nikogo bez zgody administracji, zakaz wysyłania niebezpiecznych linków i nsfw. Dotyczy równierz prywatnych wiadomości poprzez serwer.
      - 5. Twój nick musi być mentionable - zakaz dziwnych czcionek (nie dotyczy nicknamów aka pseudonimów), pustych nicków itp.`);
      embed.setColor("GREEN");
            
            message.channel.send(embed)
        }else{
            return;
        }



      
      
    }
 
    

});

client.login(process.env.TOKEN);
