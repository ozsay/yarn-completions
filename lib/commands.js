const _ = require('lodash');
const cliCommands = require('yarn/lib/cli/commands').default;

const hyphenate = (string) => string.replace(/[A-Z]/g, (match) => ('-' + match.charAt(0).toLowerCase()));

// A command like object that will gets passed to yarn commands' setFlags
// method when it exists to determine sub commands and flags.
class CommanderLike {
  constructor (command) {
    this.command = command;
    this.subCommands = [];
    this.flags = [];
  }

  usage (str) {
    const split = str.split(' ')[1];

    if (!split) return;

    let subCommands = split.split('|').map((s) => s.replace(/\[|\]/g, ''));


    if (subCommands.length <= 1) return;
    this.subCommands = subCommands;
  }

  option (flag, description) {
    // cleanup flags from bracket wrapped arguments
    flag = flag.replace(/\[[^\]]+\]/g, '').trim();

    let parts = flag.split(',');
    if (parts.length <= 1) {
      if (!description) {
        return this.flags.push(flag.trim());
      }
      return this.flags.push(`${flag}:${description}`.trim());
    }

    // have alias or several flags with same meaning
    if (!description) {
      parts.forEach((flag) => this.flags.push(flag.trim()));
      return;
    }

    parts.forEach((flag) => this.flags.push(`${flag}:${description}`.trim()));
  }

  arguments () {}
}

function generate(filteredCommands) {
  const commands = filteredCommands ? _.pick(cliCommands, filteredCommands) : cliCommands;

  return _.map(commands, (cmd, command) => {
    let flags = [];
    let subCommands = [];

    if (cmd.setFlags) {
      let commanderLike = new CommanderLike(command);
      cmd.setFlags(commanderLike);
      flags = commanderLike.flags;
      subCommands = commanderLike.subCommands;
    }

    return {
      command: hyphenate(command),
      flags: flags,
      subCommands: subCommands
    };
  });
}

module.exports = generate();
module.exports.createCommands = generate;
module.exports.CommanderLike = CommanderLike;
