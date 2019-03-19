const fs = require('fs-extra');
const Cryptr = require('cryptr');

const getKey = () => {
  return process.env.SIMPLE_FILE_ENCRYPT_KEY || null;
};

const getContents = (file) => fs
  .exists(file)
  .then((exists) => {
    if (!exists) {
      return Promise.reject(`${file} doesn't exist!`);
    }
    return fs.readFile(file);
  });

const getLockedFilenameFromOriginal = (original) => {
  return `${original}.locked`;
};

const lockFile = (original) => {
  const key = getKey();

  if (!key) {
    return Promise.reject('Must define env variable SIMPLE_FILE_ENCRYPT_KEY');
  }

  const cryptr = new Cryptr(String(key));

  return getContents(original)
    .then((contents) => fs.writeFile(
      getLockedFilenameFromOriginal(original),
      cryptr.encrypt(contents)
    ));
};

const unlockFile = (original) => {
  const key = getKey();

  if (!key) {
    return Promise.reject('Must define env variable SIMPLE_FILE_ENCRYPT_KEY');
  }

  const cryptr = new Cryptr(String(key));

  return getContents(getLockedFilenameFromOriginal(original))
    .then((contents) => fs.writeFile(
      original,
      cryptr.decrypt(contents)
    ));
};

module.exports = {
  lockFile,
  unlockFile
};
