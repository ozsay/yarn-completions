const fs = require('fs');
const path = require('path');
const LINK_FOLDER = path.join(require('user-home'), '.config/yarn/link');

module.exports = (data, done) => {
  fs.stat(LINK_FOLDER, (err) => {
    if (err) return done(err);

    fs.readdir(LINK_FOLDER, (err, files) => {
      if (err) return done(err);
      return done(null, files);
    });
  });
};
