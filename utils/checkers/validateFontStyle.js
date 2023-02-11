exports.default = (element, reqFontStyle) => {
  let boldEl, italicEl, underLineEl;

  boldEl = element.getElementsByTagName("w:b");
  italicEl = element.getElementsByTagName("w:i");
  underLineEl = element.getElementsByTagName("w:u");

  let styleEl;

  if (reqFontStyle === "bold") styleEl = boldEl;
  else if (reqFontStyle === "italic") styleEl = italicEl;
  else if (reqFontStyle === "underline") styleEl = underLineEl;

  if (styleEl && styleEl[0]) {
    console.log(typeof styleEl);
    const styleAttr = styleEl[0].getAttribute("w:val");
    return styleAttr === "1" || styleAttr === "single";
  }

  if (reqFontStyle === "normal") {
    return (
      boldEl[0] === undefined &&
      italicEl[0] === undefined &&
      underLineEl[0] === undefined
    );
  }

  return true;
};
