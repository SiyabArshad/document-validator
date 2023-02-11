const fs = require("fs");
const archiver = require("archiver");

const compressDocx = (dirPath) => {
  const archive = archiver("zip");
  const modifiedPathName = `./public/docs/${Date.now()}-modified.docx`;
  const output = fs.createWriteStream(modifiedPathName);

  archive.on("error", (err) => console.log(err));
  archive.pipe(output);
  archive.directory(dirPath, "../");
  archive.finalize();
  return modifiedPathName;
};

module.exports = compressDocx;
