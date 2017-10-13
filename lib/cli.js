const fs = require('fs');
const path = require('path');
const commands = require('./commands.json');
const debug = require('tabtab/lib/debug')('yarn-completions');
const globalOptions = require('./options.json');

const tabtab = require('tabtab')({
  name: 'yarn',
  cache: false
});

let completionCommands = commands.map((cmd) => cmd.command);
tabtab.on('yarn', (data, done) => {
  if (data.prev !== 'yarn') return;
  const commandsToReturn = completionCommands.concat(globalOptions).concat('help');

  return done(null, commandsToReturn);
});

debug();
commands.forEach((cmd) => {
  tabtab.on(cmd.command, (data, done) => {
    let line = data.line.trim();
    let file = line.replace('yarn ', './completions/').replace(/ /g, '/');
    let completionFile = path.join(__dirname, file + '.js');

    debug('line', line, 'completion', file);
    debug('completion', completionFile);

    // if a completion file exists for this command line, execute it
    if (fs.existsSync(completionFile) && fs.statSync(completionFile).isFile()) {
      return require(completionFile)(data, done);
    }

    // slice line for previous word and try to load a completion file based on this,
    // handles yarn <command> word<tab>
    line = data.line.split(' ').slice(0, -1).join(' ');
    file = line.replace('yarn ', './completions/').replace(/ /g, '/');
    completionFile = path.join(__dirname, file + '.js');

    debug('line', line, 'completion', file);
    debug('completion', completionFile);

    if (fs.existsSync(completionFile) && fs.statSync(completionFile).isFile()) {
      return require(completionFile)(data, done);
    }

    // only return command specific flags and global options if prev is not the
    // command itself
    if (data.prev !== cmd.command) return done(null, globalOptions.concat(cmd.flags));

    // lastly, returns subcommands, flags and global flags
    return done(null, cmd.subCommands.concat(cmd.flags).concat(globalOptions));
  });
});

tabtab.start();
