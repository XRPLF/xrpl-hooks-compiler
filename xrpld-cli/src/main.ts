// Importing required modules
import { Command } from "commander";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const HOST = 'localhost'
const PORT = 4000

function copyFilesToRoot(rootDir: string) {
  const sourcePath = path.join(__dirname, rootDir);
  const destinationPath = path.join(process.cwd(), 'xrpld');
  fs.mkdirSync(destinationPath, { recursive: true });
  console.log(`Created directory: ${destinationPath}`);

  // Copy files recursively from source to destination
  const copyFiles = (source: string, destination: string) => {
    const files = fs.readdirSync(source);

    files.forEach((file) => {
      const sourceFile = path.join(source, file);
      const destinationFile = path.join(destination, file);

      const stats = fs.statSync(sourceFile);

      if (stats.isDirectory()) {
        fs.mkdirSync(destinationFile, { recursive: true });
        copyFiles(sourceFile, destinationFile);
      } else {
        fs.copyFileSync(sourceFile, destinationFile);
        console.log(`Copied ${file} to the root folder.`);
      }
    });
  };

  copyFiles(sourcePath, destinationPath);

  console.log("Files copied successfully.");
}

export async function main() {
  // Creating a new command
  const program = new Command();

  // Adding an argument for the command
  program.argument("<command>", "command to execute (up, down, down:remove)");

  // Parsing the command line arguments
  program.parse(process.argv);

  // Getting the command from the arguments
  const command = program.args[0];

  // Checking if command is provided
  if (!command) {
    console.error("Command is required.");
    process.exit(1);
  }

  const distPath = path.join(__dirname, "../xrpld");

  // Executing the command
  if (command === "up") {
    console.log("Executing 'up' command...");
    copyFilesToRoot('xrpld-cluster')
    console.log("Downloading Image...");
    exec(
      `docker compose -f ${distPath}/xrpld-cluster-compose.yml up --build --force-recreate -d`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Command execution failed with error: ${error}`);
          return;
        }
        // console.log(stderr);
        // console.log(stdout);
        console.log(`Explorer running at http://${HOST}:${PORT}`);
      }
    );
  } else if (command === "down") {
    console.log("Executing 'down' command...");
    exec(
      `docker compose -f ${distPath}/xrpld-cluster-compose.yml down`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Command execution failed with error: ${error}`);
          return;
        }
        // console.log(stderr);
        // console.log(stdout);
        console.log('`down` executed successfully.');
      }
    );
  } else if (command === "down:clean") {
    console.log("Executing 'down:clean' command...");
    exec(
      `docker compose -f ${distPath}/xrpld-cluster-compose.yml down --remove-orphans`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`command execution failed with error: ${error}`);
          return;
        }
        // console.log(stderr);
        // console.log(stdout);
        exec(`rm -r ${process.cwd()}/xrpld`)
        console.log('`down:clean` executed successfully.');
      }
    );
  } else if (command === "up:standalone") {
    console.log("Executing 'up:standalone' command...");
    copyFilesToRoot('xrpld-standalone')
    console.log("Downloading Image...");
    exec(
      `docker compose -f ${distPath}/xrpld-standalone-compose.yml up --build --force-recreate -d`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Command execution failed with error: ${error}`);
          return;
        }
        // console.log(stderr);
        // console.log(stdout);
        console.log(`Explorer running at http://${HOST}:${PORT}`);
      }
    );
  } else if (command === "down:standalone") {
    console.log("Executing 'down:standalone' command...");
    exec(
      `docker compose -f ${distPath}/xrpld-standalone-compose.yml down`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Command execution failed with error: ${error}`);
          return;
        }
        // console.log(stderr);
        // console.log(stdout);
        exec(`rm -r ${process.cwd()}/xrpld`)
        console.log('`down` executed successfully.');
      }
    );
  } else {
    console.error(`Invalid command: ${command}`);
    process.exit(1);
  }
}