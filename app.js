const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config()
const auth=require("./routes/Auth")
const parameter=require("./routes/Parameter")
const {
  extractDocx,
  checkDocx,
  compressDocx,
  cleanup,
} = require("./utils/index");
const connection=require("./helpers/connection")
connection()
const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.static(path.join(__dirname, "/public/")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload-docx", async (req, res) => {
  const parameters = {
    size: req.body.fontSize,
    style: req.body.fontStyle,
    lineSpacing: req.body.lineSpacing,
    fontFamily: req.body.fontFamily,
  };

  try {
    if (!req.files) {
      return res.send({
        status: false,
        message: "No file uploaded",
      });
    } else if (
      !req.body.fontSize ||
      !req.body.fontSize ||
      !req.body.lineSpacing ||
      !req.body.fontFamily
    ) {
      return res.send({
        status: false,
        message: "some parameters are missing",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let doc = req.files.doc;
      const filePath = `./public/docs/${Date.now()}${doc.name}`;
      //Use the mv() method to store the file.
      doc.mv(filePath, async (err) => {
        if (err) console.log("err: ", err);

        const tmpExtDir = await extractDocx(filePath);
        checkDocx(parameters, `${tmpExtDir}/word/document.xml`);
        const result = compressDocx(tmpExtDir);

        res.status(200).json({ filePath: result });
        setTimeout(() => {
          cleanup(filePath, tmpExtDir);
        }, 5000);
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;

  setTimeout(() => {
    res.download(__dirname + "/public/docs/" + filename);
  }, 5000);
});
app.use("/docx/",auth)
app.use("/docx/",parameter)
app.listen(process.env.PORT,()=>{
  console.log("server is running")
});
