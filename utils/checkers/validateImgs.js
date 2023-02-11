const validateImgs = (element) => {
  // we have the paragraph
  // now we will check if we have w:drawing
  const drawingEl = element.getElementsByTagName("w:drawing");
  if (!drawingEl || !drawingEl[0]) return true;

  // ok, so we do have images, now we have to check the style
  const parentStyleEl = element.getElementsByTagName("w:pPr");
  if (!parentStyleEl || !parentStyleEl[0]) return false;

  const styleEl = parentStyleEl[0].getElementsByTagName("w:jc");
  if (!styleEl || !styleEl[0]) return false;

  const attrVal = styleEl[0].getAttribute("w:val");
  return attrVal === "center";
};

module.exports = { validateImgs };
