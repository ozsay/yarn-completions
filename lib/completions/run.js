const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const hooks = ['postinstall', 'postuninstall', 'preinstall', 'install', 'prepublish'];

module.exports = (data, done) => {
  fs.stat(path.resolve('package.json'), function (err, exists) {
    if (err) return done(err);

    let scripts = require(path.resolve('package.json')).scripts;
    if (!scripts) return;

    // Escape ':' in scripts keys (like "app:serve")
    // ':' are not TabTab separator ('command:description for command')
    // but part of the command
    let res = _(scripts)
        .keys()
        .difference(hooks)
        .map(key => key.replace(':', '\\:'))
        .value();

    return done(null, res);
  });
};
