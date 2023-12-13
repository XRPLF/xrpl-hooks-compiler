const fs = require('fs');
const path = require('path');

const sourceFolder = __dirname;
const distFolder = path.join(__dirname, 'dist/xrpld');

const filePaths = [
  'xrpld-cluster-compose.yml',
  'xrpld-standalone-compose.yml',
];

filePaths.forEach(filePath => {
  const sourcePath = path.join(sourceFolder, filePath);
  const distPath = path.join(distFolder, filePath);

  fs.copyFileSync(sourcePath, distPath);
  console.log(`File '${filePath}' copied successfully.`);
});

function copyDirectoryCluster(sourceDir, targetDir) {
    // Create the target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
  
    // Read the contents of the source directory
    const files = fs.readdirSync(sourceDir);
  
    // Iterate over each file/directory in the source directory
    files.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
  
      // Check if the current item is a file or directory
      if (fs.lstatSync(sourcePath).isFile()) {
        // If it's a file, copy it to the target directory
        fs.copyFileSync(sourcePath, targetPath);
      } else {
        // If it's a directory, recursively copy its contents to the target directory
        copyDirectoryCluster(sourcePath, targetPath);
      }
    });
  }
  
// Usage example
const clusterDir = path.join(__dirname, 'xrpld-cluster');
const clusterDistDir = path.join(__dirname, 'dist/xrpld/xrpld-cluster');

copyDirectoryCluster(clusterDir, clusterDistDir);

const standaloneDir = path.join(__dirname, 'xrpld-standalone');
const standaloneDistDir = path.join(__dirname, 'dist/xrpld/xrpld-standalone');

copyDirectoryCluster(standaloneDir, standaloneDistDir);