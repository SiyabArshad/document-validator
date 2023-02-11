const fs = require("fs");
const { DOMParser, XMLSerializer } = require("xmldom");
const {
  validateLineSpacing,
  validateFontFamily,
  validateFontSize,
  validateFontStyle,
  validateImgs,
  validateTables,
} = require("./checkers/index").default;

const setUnderLineError = (color, parentEl) => {
  const child = new DOMParser().parseFromString(
    `<w:u w:val="wave" w:color="${color}" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>`,
    "text/xml"
  );

  parentEl.appendChild(child.documentElement);
};

const getInvalidColor = (result) => {
  let color = "ff0000";

  if (!result.validFontFamily) color = "00ff00";
  if (!result.validSize) color = "0000ff";

  return color;
};

const modifyDoc = (parameters, filePath) => {
  fs.readFile(filePath, "utf-8", (err, xmlData) => {
    if (err) throw new Error(err);
    const doc = new DOMParser().parseFromString(xmlData, "text/xml");
    const paragraphs = doc.getElementsByTagName("w:p");

    // loop through all the paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      const r = paragraphs[i].getElementsByTagName("w:r");

      for (let j = 0; j < r.length; j++) {
        const txt = r[j].getElementsByTagName("w:t");
        const styleParentEl = r[j].getElementsByTagName("w:rPr");
        if (!txt || !txt[0]) continue;
        if (!styleParentEl || !styleParentEl[0]) continue;

        const obj = {
          txt: txt[0].textContent,
          validSize: validateFontSize(r[j], parameters.size),
          validStyle: validateFontStyle(r[j], parameters.style),
          validFontFamily: validateFontFamily(r[j], parameters.fontFamily),
          validate() {
            return this.validSize && this.validStyle && this.validFontFamily;
          },
        };

        if (!obj.validate()) {
          let color = getInvalidColor(obj);
          setUnderLineError(color, styleParentEl[0]);
        }
      }

      const isLineSpcValid = validateLineSpacing(
        paragraphs[i],
        parameters.lineSpacing
      );

      if (!isLineSpcValid) {
        const rows = paragraphs[i].getElementsByTagName("w:r");
        for (let r = 0; r < rows.length; r++) {
          const styleParentEl = rows[r].getElementsByTagName("w:rPr");
          if (!styleParentEl || !styleParentEl[0]) continue;

          setUnderLineError("00ffff", styleParentEl[0]);
        }
      }

      const isImgValid = validateImgs(paragraphs[i]);

      if (!isImgValid) {
        let color = "f0f003";
        const styleParentEl = paragraphs[i].getElementsByTagName("w:r");

        if (!styleParentEl || !styleParentEl[0]) continue;
        const styleEl = styleParentEl[0].getElementsByTagName("w:rPr");

        if (!styleEl || !styleEl[0]) continue;

        setUnderLineError(color, styleEl[0]);
      }
    }

    // loop through all the tables
    const tables = doc.getElementsByTagName("w:tbl");

    for (let t = 0; t < tables.length; t++) {
      const isTableValid = validateTables(tables[t]);
      if (isTableValid) continue;

      const styleEl = tables[t].getElementsByTagName("w:tblPr");
      if (!styleEl || !styleEl[0]) continue;

      const markup = `
        <w:tblBorders xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" >
          <w:top w:val="single" w:sz="4" w:space="0" w:color="FF0000"/>
          <w:left w:val="single" w:sz="4" w:space="0" w:color="FF0000"/>
          <w:bottom w:val="single" w:sz="4" w:space="0" w:color="FF0000"/>
          <w:right w:val="single" w:sz="4" w:space="0" w:color="FF0000"/>
          <w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>
          <w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>
        </w:tblBorders>`;

      // check if we already have borders
      const borderEl = styleEl[0].getElementsByTagName("w:tblBorders");
      if (!borderEl || !borderEl[0]) {
        // there's no borders
        const child = new DOMParser().parseFromString(markup, "text/xml");
        styleEl[0].appendChild(child.documentElement);
      } else {
        // edit the existing ones
        const borders = ["w:top", "w:left", "w:bottom", "w:right"];
        borders.forEach((border) => {
          const topBorder = borderEl[0].getElementsByTagName(border);
          if (!topBorder || !topBorder[0]) {
            const markup = `<${border} w:val="single" w:sz="4" w:space="0" w:color="FF0000"/>`;
            const child = new DOMParser().parseFromString(markup, "text/xml");
            borderEl[0].appendChild(child.documentElement);
          } else {
            const ns =
              "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
            topBorder[0].setAttributeNS(ns, "w:val", "single");
            topBorder[0].setAttributeNS(ns, "w:sz", "4");
            topBorder[0].setAttributeNS(ns, "w:color", "FF00000");
          }
        });
      }
    }

    const strSterilizer = new XMLSerializer();

    fs.writeFileSync(filePath, strSterilizer.serializeToString(doc), (err) => {
      if (err) console.log(err);
    });
  });
};

module.exports = modifyDoc;
