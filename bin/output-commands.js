#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const completionOn = ['add', 'cache', 'clean', 'config', 'exec', 'global', 'info', 'install', 'link', 'outdated', 'publish', 'remove', 'unlink', 'why', 'workspace', 'run'];
// const completionOn = [];

const commands = require('../lib/commands').createCommands(completionOn);
// const commands = require('../lib/commands').createCommands();

fs.writeFileSync(path.resolve(__dirname, '../lib/commands.json'), JSON.stringify(commands, null, 4));
