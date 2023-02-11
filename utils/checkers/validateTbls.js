const validateTables = (element) => {
  const styleParentEl = element.getElementsByTagName("w:tblPr");
  if (!styleParentEl || !styleParentEl[0]) return false;

  // element responsible for justification
  const styleEl = styleParentEl[0].getElementsByTagName("w:jc");
  if (!styleEl || !styleEl[0]) return false;

  const val = styleEl[0].getAttribute("w:val");
  return val === "center";
};

module.exports = { validateTables };
