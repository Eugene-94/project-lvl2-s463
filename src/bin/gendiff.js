#!/usr/bin/env node

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format <type>', 'output format')
  .action(() => console.log('it has run'))
  .parse(process.argv);
