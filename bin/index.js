#!/usr/bin/env node

const fs = require('fs-extra');
const Cryptr = require('cryptr');
const args = require('yargs').argv;

const log = console.log;

if (
  (args.command !== 'lock' && args.command !== 'unlock') ||
  !args.key ||
  !args.original ||
  !args.locked) {
  log(`
    Sample usage:

    node enc.js \\
      --command lock \\
      --key abcd \\
      --original ./production.json \\
      --locked ./production.locked
  `);
  log(args);
  return;
}

const cryptr = new Cryptr(String(args.key));

const getFileContents = (file) => {
  return fs.exists(file).then((exists) => {
    if (!exists) {
      return Promise.reject(`${file} doesn't exist!`);
    }
    return fs.readFile(file);
  })
}

const lockFile = () => {
  log(`Locking ${args.original}`);
  return getFileContents(args.original).then((contents) => {
    return fs.writeFile(
      args.locked,
      cryptr.encrypt(contents)
    );
  });
};

const unlockFile = () => {
  log(`Unlocking ${args.locked}`);
  return getFileContents(args.locked).then((contents) => {
    return fs.writeFile(
      args.original,
      cryptr.decrypt(contents)
    );
  });
};

const command = args.command === 'lock'
  ? lockFile()
  : unlockFile();

command
  .then(() => {
    log('Done!');
  })
  .catch((err) => {
    log('FAILED:', err.message
      ? err.message
      : err);
  });
