#!/usr/bin/env node

// Importing required modules
import { Command } from "commander";
import { buildWasm, readFiles } from "./build";

export function main() {
  // Creating a new command
  const program = new Command();

  // Adding an argument for the directory path
  program.argument("<dirPath>", "directory path");
  program.argument("<outDir>", "output directory");

  // Parsing the command line arguments
  program.parse(process.argv);

  // Getting the directory path from the arguments
  const dirPath = program.args[0];
  const outDir = program.args[1] || "build";

  // Checking if directory path is provided
  if (!dirPath) {
    console.error("Directory path is required.");
    process.exit(1);
  }

  // Checking if directory path is provided
  if (!outDir) {
    console.error("Output Directory path is required.");
    process.exit(1);
  }
  if (outDir === ".") {
    console.error("Output Directory path is invalid.");
    process.exit(1);
  }

  // Reading all files in the directory tree
  let fileObjects: any[];
  try {
    fileObjects = readFiles(dirPath);
  } catch (error) {
    console.error(`Error reading files: ${error}`);
    process.exit(1);
  }

  // Building wasm for each file object
  Promise.all(
    fileObjects.map(async (fileObject) => {
      try {
        await buildWasm(fileObject, outDir);
      } catch (error) {
        console.error(`Error building wasm: ${error}`);
        process.exit(1);
      }
    })
  ).catch((error) => {
    console.error(`Error building wasm: ${error}`);
    process.exit(1);
  });
}
