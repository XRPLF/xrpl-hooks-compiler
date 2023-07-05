import * as fs from "fs";
import * as path from "path";
import { FilePayload } from "sdk-ts";

export function gatherFileContents(srcDir: string): FilePayload[] {
  // Read all files from source directory
  const files = fs.readdirSync(srcDir);
  const fileContents: FilePayload[] = [];

  for (const file of files) {
    const srcFile = path.join(srcDir, file);

    // Check if it's a file
    if (fs.lstatSync(srcFile).isFile()) {
      // Read file contents into a string
      const contents = fs.readFileSync(srcFile, "utf8");
      const filepayload: FilePayload = {
        filename: srcFile.split("/").pop() as string,
        contents: contents,
      };
      fileContents.push(filepayload);
    }
  }

  return fileContents;
}
