const validateFontFamily = require("./validateFontFamily").default;
const validateFontSize = require("./validateFontSize").default;
const validateFontStyle = require("./validateFontStyle").default;
const validateLineSpacing = require("./validateSpacing").default;
const { validateTables } = require("./validateTbls");
const { validateImgs } = require("./validateImgs");

exports.default = {
  validateFontFamily,
  validateFontSize,
  validateFontStyle,
  validateLineSpacing,
  validateTables,
  validateImgs,
};
