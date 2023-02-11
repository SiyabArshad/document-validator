exports.default = (element, reqFontSize) => {
  const el = element.getElementsByTagName("w:sz");

  if (!el || !el[0]) {
    // default font is 11  and when it's default it won't be set
    return parseInt(reqFontSize) === 11;
  }

  const size = el[0].getAttribute("w:val");
  return parseInt(reqFontSize) === Math.round(parseInt(size) / 2);
};
