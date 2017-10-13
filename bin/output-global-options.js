#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CommanderLike = require('../lib/commands').CommanderLike;

const commander = new CommanderLike();

// taken from yarn
commander.option('--verbose', 'output verbose messages on internal operations');
commander.option('--offline', 'trigger an error if any required dependencies are not available in local cache');
// commander.option('--prefer-offline', 'use network only if dependencies are not available in local cache');
// commander.option('--strict-semver');
// commander.option('--json', '');
commander.option('--ignore-scripts', "don't run lifecycle scripts");
// commander.option('--har', 'save HAR output of network traffic');
// commander.option('--ignore-platform', 'ignore platform checks');
commander.option('--ignore-engines', 'ignore engines check');
// commander.option('--ignore-optional', 'ignore optional dependencies');
commander.option('--force', 'install and build packages even if they were built before, overwrite lockfile');
// commander.option('--skip-integrity-check', 'run install without checking if node_modules is installed');
// commander.option('--check-files', 'install will verify file tree of packages for consistency');
// commander.option('--no-bin-links', "don't generate bin links when setting up packages");
commander.option('--flat', 'only allow one version of a package');
commander.option('--prod, --production [prod]', '');
commander.option('--no-lockfile', "don't read or generate a lockfile");
commander.option('--pure-lockfile', "don't generate a lockfile");
commander.option('--frozen-lockfile', "don't generate a lockfile and fail if an update is needed");
// commander.option('--link-duplicates', 'create hardlinks to the repeated modules in node_modules');
// commander.option('--global-folder <path>', 'specify a custom folder to store global packages');
// commander.option(
//     '--modules-folder <path>',
//     'rather than installing modules into the node_modules folder relative to the cwd, output them here'
// );
commander.option('--cache-folder <path>', 'specify a custom folder to store the yarn cache');
commander.option('--mutex <type>[:specifier]', 'use a mutex to ensure only one yarn instance is executing');
// commander.option('--emoji', 'enable emoji in output', process.platform === 'darwin');
commander.option('-s, --silent', 'skip Yarn console logs, other types of logs (script output) will be printed');
// commander.option('--proxy <host>', '');
// commander.option('--https-proxy <host>', '');
commander.option('--no-progress', 'disable progress bar');
// commander.option('--network-concurrency <number>', 'maximum number of concurrent network requests', parseInt);
// commander.option('--network-timeout <milliseconds>', 'TCP timeout for network requests', parseInt);
// commander.option('--non-interactive', 'do not show interactive prompts');
// commander.option('--scripts-prepend-node-path [bool]', 'prepend the node executable dir to the PATH in scripts');

fs.writeFileSync(path.resolve(__dirname, '../lib/options.json'), JSON.stringify(commander.flags, null, 4));
