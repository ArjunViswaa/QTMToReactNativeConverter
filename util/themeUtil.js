// Converts a Quantum skin object to a CSS class
const skinToCSSClass = (skinName, skinObj) => {
  const className = skinName.replace(/\.[^/.]+$/, "");
  let css = `.${className} {\n`;

  if (skinObj.background_color) {
    css += `  background-color: ${skinObj.background_color};\n`;
  }

  if (skinObj.font_color) {
    css += `  color: ${skinObj.font_color};\n`;
  }

  if (skinObj.font_size) {
    css += `  font-size: ${skinObj.font_size}px;\n`;
  }

  if (skinObj.border_style) {
    css += `  border-radius: ${
      skinObj.border_style === "rc" ? "10" : "0"
    }px;\n`;
  }

  if (skinObj.padding) {
    css += `  padding: ${skinObj.padding}px;\n`;
  }

  css += `}\n\n`;
  return css;
};

// Generates CSS output from a list of themes
const generateCSSFromThemes = (themesList) => {
  let cssOutput = "";

  themesList.forEach((theme) => {
    try {
      const skinObj = JSON.parse(theme.data);
      cssOutput += skinToCSSClass(theme.themeName, skinObj);
    } catch (err) {
      console.warn(`⚠️ Skipping invalid skin: ${theme.themeName}`);
    }
  });

  return cssOutput;
};

module.exports = {
  generateCSSFromThemes
};
