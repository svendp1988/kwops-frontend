#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 -i schema.yaml -o output/ -h http://localhost')
  .string(['i', 'o', 'h'])
  .alias('i', 'input')
  .alias('o', 'output')
  .alias('h', 'host')
  .demandOption(['i', 'o'])
  .help().argv;

const generateAxiosMockAdapter = require("./OpenApiUtils.js");

generateAxiosMockAdapter(argv.i, argv.o, argv.h);