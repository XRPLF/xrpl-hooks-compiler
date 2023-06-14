// Importing required modules
import axios from "axios";
import fs from "fs";
import path from "path";
import { decodeBinary } from "./decodeBinary";
import "dotenv/config";

export async function buildDir(dirPath: string, outDir: string): Promise<void> {
  // Reading all files in the directory tree
  let fileObjects: any[];
  try {
    fileObjects = readFiles(dirPath);
  } catch (error: any) {
    console.error(`Error reading files: ${error}`);
    process.exit(1);
  }

  // Building wasm for each file object
  await Promise.all(
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

// Function to read all files in a directory tree
export function readFiles(dirPath: string): any[] {
  const files: any[] = [];
  const fileNames = fs.readdirSync(dirPath);
  for (const fileName of fileNames) {
    const filePath = path.join(dirPath, fileName);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      files.push(...readFiles(filePath));
    } else if (path.extname(fileName) === ".c") {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      files.push({
        type: "c",
        name: fileName,
        options: "-O3",
        src: fileContent,
      });
    }
  }
  return files;
}

export async function buildWasm(fileObject: any, outDir: string) {
  const filename = fileObject.name.split(".c")[0];
  // Sending API call to endpoint
  const body = JSON.stringify({
    output: "wasm",
    compress: true,
    strip: true,
    files: [fileObject],
  });
  try {
    const response = await axios.post(
      `${process.env.API_HOST}/api/build`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Saving response to file
    const responseData = response.data;
    const success = responseData.success === true;
    const message = responseData.message;
    const output = success ? responseData.output : "";
    const tasks = responseData.tasks.map((task: any) => {
      return {
        name: task.name,
        console: task.console,
        success: task.success === true,
      };
    });

    // Creating result object
    const result = {
      success,
      message,
      output,
      tasks,
    };
    // console.log(result);
    const binary = await decodeBinary(result.output);
    const outDirPath = process.cwd() + "/" + outDir;
    fs.mkdir(outDirPath, (err) => {
      if (err) {
        // console.error(err);
        fs.writeFileSync(
          path.join(outDirPath + "/" + filename + ".wasm"),
          Buffer.from(binary)
        );
      } else {
        // console.log(`Directory ${outDirPath} created successfully`);
        fs.writeFileSync(
          path.join(outDirPath + "/" + filename + ".wasm"),
          Buffer.from(binary)
        );
      }
    });
  } catch (error: any) {
    console.log(`Error sending API call: ${error}`);
  }
}
