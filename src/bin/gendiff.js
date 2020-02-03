#!/usr/bin/env node
import gendiff from '..';

const program = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format <type>', 'Output format', 'tree')
  .arguments('<firstConfig> <secondConfig> [formatter]')
  .action((firstConfig, secondConfig) => console.log(
    gendiff(firstConfig, secondConfig, program.format),
  ))
  .parse(process.argv);
