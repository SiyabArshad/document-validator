const validateLineSpacing = (paragraph, reqLineSpace) => {
  const lineSpaceEl = paragraph.getElementsByTagName("w:spacing");
  if (!lineSpaceEl || !lineSpaceEl[0]) {
    return parseInt(reqLineSpace) === 1;
  }

  reqLineSpace *= 240;

  const lineVal = parseInt(lineSpaceEl[0].getAttribute("w:line"));
  const afterVal = parseInt(lineSpaceEl[0].getAttribute("w:after"));
  const beforeVal = parseInt(lineSpaceEl[0].getAttribute("w:before"));

  let result = true;
  if (lineVal !== reqLineSpace) {
    result = false;
  }

  if (afterVal) {
    if (afterVal !== reqLineSpace) result = false;
  }

  if (beforeVal) {
    if (beforeVal !== reqLineSpace) result = false;
  }

  return result;
};

exports.default = validateLineSpacing;
