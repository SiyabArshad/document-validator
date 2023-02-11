const fs = require("fs");

const cleanup = (filePath, dirPath) => {
  // delete the original file
  fs.unlinkSync(filePath);

  // delete the extracted directory
  fs.rmSync(dirPath, { recursive: true });
};

module.exports = cleanup;
