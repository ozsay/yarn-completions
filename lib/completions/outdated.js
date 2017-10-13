const fs = require('fs');
const path = require('path');
const debug = require('tabtab/lib/debug')('yarn-completions');

module.exports = (data, done) => {
  fs.stat(path.resolve('package.json'), function (err) {
    debug(`outdated: ${!!err}`);
    if (err) return done(err);

    const { dependencies = {}, devDependencies = {} } = require(path.resolve('package.json'));

    return done(null, Object.keys(dependencies).concat(Object.keys(devDependencies)));
  });
};
