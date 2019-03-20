const fs = require('fs-extra');
const Cryptr = require('cryptr');
const os = require('os');
const path = require('path');

const getKey = () => {
  const configFile = path.join(
    os.homedir(),
    '.simple-file-encrypt-key'
  )

  const throwMissingKey = () => {
    throw new Error(`Please define env variable SIMPLE_FILE_ENCRYPT_KEY or add the key to ${configFile}`);
  };

  const keyFromEnv = process.env.SIMPLE_FILE_ENCRYPT_KEY || null;;

  if (keyFromEnv) {
    return Promise.resolve(keyFromEnv);
  }

  return fs.exists(configFile).then((exists) => {
    if (exists) {
      return fs
        .readFile(configFile, 'utf8')
        .then((key) => {
          if (!key) {
            throwMissingKey();
          }
          return key;
        })
        .catch(throwMissingKey)
    }

    return throwMissingKey();
  })
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
  return getKey().then((key) => {
    const cryptr = new Cryptr(String(key));
  
    return getContents(original)
      .then((contents) => fs.writeFile(
        getLockedFilenameFromOriginal(original),
        cryptr.encrypt(contents)
      ));
  });
};

const unlockFile = (original) => {
  return getKey().then((key) => {
    const cryptr = new Cryptr(String(key));

    return getContents(getLockedFilenameFromOriginal(original))
      .then((contents) => fs.writeFile(
        original,
        cryptr.decrypt(contents)
      ));
  })
};

module.exports = {
  lockFile,
  unlockFile
};
