const { Client, Collection } = require("discord.js");
const fs = require("fs");
const player = require("../../src/modules/Music");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);

class Kehay extends Client {

  constructor(options) {
    super(options);
    this.db = require("quick.db");
    this.queue = new Map();
    this.player = new player(this);
  }

}

module.exports = Kehay