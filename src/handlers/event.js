const fs = require("fs")

module.exports = (client) => {

// Events Handlers :
fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const evt = require(`../events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`『EventsHandler』 Berhasil Menemukan Events : ${evtName}`);
    client.on(evtName, evt.bind(null, client));
  });
});
  
}