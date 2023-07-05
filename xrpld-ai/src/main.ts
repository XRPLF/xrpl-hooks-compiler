import { Command } from "commander";
import { watchFile, FSWatcher, unwatchFile } from "fs";
import ApiService from "./api";
import fs from "fs";
import path from "path";
import { gatherFileContents } from "./utils";

export async function main() {
  const program = new Command();

  program.argument("<sourceDir>", "source directory");
  program.argument("<debugFilepath>", "debug file path");
  program.option("--model", "use the model flag");

  program.parse(process.argv);

  const sourceDir = program.args[0];
  const debugFilepath = program.args[1];

  if (!sourceDir) {
    console.error("<sourceDir> is required.");
    process.exit(1);
  }

  if (!debugFilepath) {
    console.error("<debugFilepath> is required.");
    process.exit(1);
  }

  let timer: NodeJS.Timeout | null = null;

  const contractPath = path.join(process.cwd(), sourceDir);
  const filePath = path.join(process.cwd(), debugFilepath);

  watchFile(filePath, (curr, prev) => {
    console.log("watching...");
    if (curr.mtime !== prev.mtime) {
      try {
        const filename = filePath.split("/").pop();
        console.log(`File ${filename} has been modified`);
        const logfile = fs.readFileSync(filePath, "utf8");
        const files = gatherFileContents(contractPath);
        console.log("wait for AI response....");

        ApiService.debugPrompt(files, logfile, "", "rippled-expert")
          .then((result) => {
            console.log(result.answer);
          })
          .catch((error) => {
            console.log(error.message);
          });

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          // console.log("Waiting for debug file...");
          timer = null;
        }, 2000); // Change the delay as per your requirement
      } catch (error: any) {
        // console.error(error.message);
      }
    }
  });

  process.on("exit", () => {
    console.log("exiting...");

    if (timer) {
      clearTimeout(timer);
    }
    unwatchFile(filePath);
  });
}
