#!/usr/bin/env node

const fs = require('fs-extra');
const Cryptr = require('cryptr');
const args = require('yargs').argv;

const log = console.log;

const cryptr = new Cryptr(String(args.key));

const getContents = (file) => fs
  .exists(file)
  .then((exists) => {
    if (!exists) {
      return Promise.reject(`${file} doesn't exist!`);
    }
    return fs.readFile(file);
  });

const lockFile = () => {
  return getContents(args.original)
    .then((contents) => fs.writeFile(
      args.locked,
      cryptr.encrypt(contents)
    ));
};

const unlockFile = () => {
  return getContents(args.locked)
    .then((contents) => fs.writeFile(
      args.original,
      cryptr.decrypt(contents)
    ));
};

const commands = {
  lock: lockFile,
  unlock: unlockFile
};

if (
  (!commands[args.command]) ||
  !args.key ||
  !args.original ||
  !args.locked) {
  log(`
    Sample usage:

    simple-file-encrypt \\
      --command lock|unlock \\
      --key abcd \\
      --original ./production.json \\
      --locked ./production.locked
  `);
  return;
}

commands[args.command]()
  .then(() => {
    log('Done!');
  })
  .catch((err) => {
    log('FAILED:', err.message
      ? err.message
      : err);
  });
