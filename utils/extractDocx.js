const fs = require("fs");
const StreamZip = require("node-stream-zip");

async function extractDocx(filePath) {
  const zip = new StreamZip.async({
    file: filePath,
  });

  const tmpExtDir = `./public/extracted-${Date.now()}`;
  fs.mkdirSync(tmpExtDir);

  await zip.extract(null, tmpExtDir);
  await zip.close();
  return tmpExtDir;
}

module.exports = extractDocx;
