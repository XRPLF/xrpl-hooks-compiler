#!/usr/bin/env node

const { main } = require("../dist/npm");

async function run() {
  await main();
}

run();
