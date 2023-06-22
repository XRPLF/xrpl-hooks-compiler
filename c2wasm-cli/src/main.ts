#!/usr/bin/env node

// Importing required modules
import { Command } from "commander";
import { buildDir, buildFile } from "./build";
import fs from "fs";

export async function main() {
  // Creating a new command
  const program = new Command();

  // Adding an argument for the directory path
  program.argument("<inPath>", "input path (dir/file)");
  program.argument("<outDir>", "output directory");

  // Parsing the command line arguments
  program.parse(process.argv);

  // Getting the directory path from the arguments
  const inPath = program.args[0];
  const outDir = program.args[1] || "build";

  // Checking if directory path is provided
  if (!inPath) {
    console.error("Input path is required.");
    process.exit(1);
  }

  // Checking if directory path is provided
  if (!outDir) {
    console.error("Output directory path is required.");
    process.exit(1);
  }

  try {
    const outStat = fs.statSync(outDir);
    if (!outStat.isDirectory()) {
      console.error("Output path must be a directory.");
      process.exit(1);
    }
  } catch (error: any) {
    fs.mkdir(outDir, async () => console.log(`Created directory: ${outDir}`));
  }

  const dirStat = fs.statSync(inPath);
  if (dirStat.isDirectory()) {
    await buildDir(inPath, outDir);
  } else {
    await buildFile(inPath, outDir);
  }
}
