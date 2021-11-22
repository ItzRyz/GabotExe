// Pkg Only :
const { Discord, MessageEmbed, Collection } = require("discord.js");
const Kehay = require("../../src/modules/Kehay.js");

const client = new Kehay({
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START", "USER_NOTE_UPDATE"],
  disableEveryone: true
});

const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
const sa = require("superagent");

const data = require("../../src/data/data.js")(client);
const config = require("../../src/data/config.json");
const { color } = require("../../src/data/config.json");
const playe = require("../../src/modules/Music");

// Client Only :
client.moment = moment.locale("id");
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.categories = fs.readdirSync("./src/cmds/");
client.bhs = new db.table('Language')
client.mod = new db.table('Moderation')
client.cf = new db.table('ChatFilter')
client.color = config.color
client.config = config
client.mt = new db.table('Maintenance')
const queue = new Map();
client.queue = queue
client.asq = new playe(this);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
  
// Command Data
["command", "event"].forEach(handler => {
  require(`../../src/handlers/${handler}.js`)(client);
});

client.on("message", async message => {
  
  let msg = message
  if (message.author.bot) return;
  if (!message.guild) return;
  if (msg.channel.type === "dm") return;
  let prefix = await client.mod.fetch(`${message.guild.id}.prefix.prefixes`);
  if (!prefix) {
    prefix = config.prefix;
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let main = await client.mt.get(`mt.stat`)
  let lang = await client.bhs.fetch(`${message.guild.id}.lang.bhs`);
  if (lang == 'indonesia') {
    if (main == 'on') {
      if (message.author.id !== "486502585587466240" && message.author.id !== "271995898911916032")
        return message.channel.send(
          `${message.author}, Bot Sedang **Maintenance**`
        );
    }
  }

  if (lang == 'english' || lang == undefined) {
    if (main == 'on') {
      if (message.author.id !== "486502585587466240" && message.author.id !== "271995898911916032")
        return message.channel.send(
          `${message.author}, Bot Is Now **Maintenance**`
        );
    }
  }

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  try {
    if (command) command.run(client, message, args, color, queue);
  } catch (e) {
    console.log(e);
  } finally {
    const Discord = require("discord.js")
    //const hook = new Discord.WebhookClient('701051448556912672', '9kVjy1gzBfGjO8nxZ9FwK3pEKUO2RAX1nrT-0TLrdIMQVEofTcft03a2pU3tOLD-mC2i');
   //hook.send(`${message.author.tag} : ID ${msg.author.id} Menggunakan Perintah : ${cmd} Di Server ${message.guild.name} ID : (${message.guild.id}`);
    if (!command) {
      message.delete()
    if (lang == 'english' || lang == undefined) {
      let a = message.channel
        .send(`❌ Commands ${cmd} not found!`)
        .then(a => a.delete({timeout: 3000}))
    }
    if (lang == 'indonesia') {
      msg.delete()
       let a = message.channel
       .send(`❌ Perintah ${cmd} tidak dapat di temukan!`)
       .then(a => a.delete({timeout: 3000})) 
    }
    }
  }
}); 