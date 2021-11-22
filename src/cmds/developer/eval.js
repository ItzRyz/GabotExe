const { inspect } = require("util")
const Discord = require("discord.js");
const fs = require("fs");
const { post } = require('snekfetch');
const db = require('quick.db')
const moment = require('moment')
const queue = new Map();
const ms = require("ms")
const opus = require("opusscript");
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const ffmpeg = require("ffmpeg")
const genius = require("genius-lyrics");
const ytdl = require("discord-ytdl-core");
const Genius = new genius.Client(process.env.genius);
const http = require("http");

const warningTokenMessage = ["Nothing to see"]

module.exports = {
    name: "eval",
    aliases: ["e", "ev"],
    category: "developer",
    description: "sstt",
    run: async (client, message, args, color, queue) => {
      
  var msg = message
  var youtube = YouTube
  this.client = client
  var serverQueue = queue.get(message.guild.id)
  var bot = client
    var on = true
    var off = false
    var id = 'indonesia'
    var en = 'english'
    var config = client.config
  
  if(msg.author.id !== "486502585587466240" && msg.author.id !== "449594065248583680" && msg.author.id !== "271995898911916032") return msg.channel.send(`Not developer`);
  
	if (!args[0]) return msg.channel.send("You missing 1 argument in here.")

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField('📥 | Masuk', '```js\n' + args.join(" ") + '```')
  
      try {
        let code = args.join(' ');
        // Evaled Time
        let evaled;
        if (code.includes(`token`)) {
          evaled = warningTokenMessage[Math.floor(Math.random() * warningTokenMessage.length)];
          console.log(`${msg.author.tag} use this eval to against the tokens and privacy.`)
        } else {
          evaled = eval(code);
          //let type = evaled && evaled.constructor ? evaled.constructor.name : typeof evaled;
          /*if (evaled instanceof Promise) {
            evaled = await eval(code);
          }*/
          }
        
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled, { depth: 0 });
      let output = clean(evaled);
      if (output === 'undefined') output = `${Math.floor(Math.random() * 1000)}`
      if (output.length > 1024) {
          const { body } = await post('https://hasteb.in/documents').send(output);
          embed.addField('📤 | Output', `https://hasteb.in/${body.key}.js`)
          embed.setColor(client.color);
      } else {
          embed.addField('📤 | Output', '```js\n' + output + '```')
          embed.setColor(client.color);
      }
      msg.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://hasteb.in/documents').send(error);
          embed.addField('❌ | Error', `https://hasteb.in/${body.key}.js`)
          embed.setColor(client.color);
      } else {
          embed.addField('❌ | Error', '```js\n' + error + '```')
          embed.setColor(client.color);
      }
      msg.channel.send(embed);
    }


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}}}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
} 
