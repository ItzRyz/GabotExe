const Discord = require("discord.js")

module.exports = {
    name: "test",
    category: "developer",
    description: "sstt",
    run: async (client, msg, args) => {
      
  if(msg.author.id !== "486502585587466240" && msg.author.id !== "449594065248583680") return msg.channel.send(`Not developer`);

    let number = client.guilds.cache.array().sort().map((x,i) => `\`${i+1}\` <a:kepitinggoyang:674797967814950932> ${x.toString()}  (${x.id}) <a:oneline:674798151147978773> **${x.memberCount}** Members`)
    number = chunk(number, 10);
  
  if (!number) return msg.channel.send("Sorry, this server not have emoji")

    let index = 0;
  
  try {
  const ge = new Discord.MessageEmbed()
  .setColor(client.color)
  .setAuthor(`| User List`, msg.guild.iconURL())
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
    const m = await msg.channel.send(ge);
    await m.react('⬅');
  await m.react('🔴');
    await m.react('➡');
    async function awaitReaction() {
    const filter =(rect, usr) => ['⬅', '🔴', '➡'].includes(rect.emoji.name) && usr.id === msg.author.id;
        const response = await m.awaitReactions(filter, {
            max: 1,
            time: 1000000
        });
        if(!response.size){
            return undefined;
        }
        const emoji = response.first().emoji.name;
        if(emoji === '⬅') index--;
    if(emoji === '🔴')  m.delete();
        if(emoji === '➡') index++;
    
        index = ((index % number.length) + number.length) % number.length;
        ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
        await m.edit(ge);
        return awaitReaction();
    }
    return awaitReaction();
  }
  catch(e){
   console.log(e) //return message.channel.send(`Oh, an error ocurred :( \`${e.message}\` try again later`)
  }

}
}

function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }