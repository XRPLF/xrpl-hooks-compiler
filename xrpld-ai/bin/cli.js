#!/usr/bin/env node

const { main } = require("../dist/xrpld");

async function run() {
  await main();
}

run();
