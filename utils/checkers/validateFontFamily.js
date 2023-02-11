exports.default = (element, reqFontFamily) => {
  const fontFamily = reqFontFamily.toLowerCase();

  const fontEl = element.getElementsByTagName("w:rFonts");

  if (!fontEl || !fontEl[0]) {
    return fontFamily === "calibri";
  }

  const fontAsciVal = fontEl[0].getAttribute("w:ascii").toLowerCase();

  const asciCase = fontFamily.indexOf(fontAsciVal) !== -1;
  const revAsciCase = fontAsciVal.indexOf(fontFamily) !== -1;

  return asciCase || revAsciCase;
};
