#!/usr/bin/env node

const args = require('yargs').argv;
const lib = require('../lib');

const log = console.log;
if (!args._.length) {
  log(`
    export SIMPLEFILE_ENCRYPT_KEY=abcd
    simple-file-encrypt ./production.json
  `);
  return;
}

lib.lockFile(args._[0])
  .catch((err) => {
    log(err.message
      ? err.message
      : err);
  });
