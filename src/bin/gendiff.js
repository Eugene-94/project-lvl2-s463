#!/usr/bin/env node

import test from '..';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format <type>', 'Output format')
  .action(test)
  .parse(process.argv);
