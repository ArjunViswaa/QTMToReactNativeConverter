const fs = require('fs');
const path = require('path');
const { generateCSSFromThemes } = require('./util/themeUtil');

const formDir = path.join(__dirname, "form", "Home.sm");
const controllerDir = path.join(__dirname, "controller", "HomeController");
const skinsDir = path.join(__dirname, "skins");

const files = fs.readdirSync(formDir);
const themes = fs.readdirSync(skinsDir);

let formWidgets = [], themesList = [];

// Fetching the objects for form widgets
files.forEach(file => {
    const fullPath = path.join(formDir, file);
    const rawData = fs.readFileSync(fullPath, "utf8");
    const parsedData = JSON.parse(rawData);

    formWidgets.push({
      fileName: file,
      data: parsedData
    });
});

// Fetching the themes from skins directory
themes.forEach(theme => {
    const themePath = path.join(skinsDir, theme);
    const themeData = fs.readFileSync(themePath, "utf8");
    themesList.push({
      themeName: theme,
      data: themeData
    });
});

let cssOutput = generateCSSFromThemes(themesList);

// Write the output to themes.css
const outputPath = path.join(__dirname, "output", "themes.css");
fs.writeFileSync(outputPath, cssOutput, "utf8");

console.log("🎨 themes.css generated successfully...");

console.log("Total files loaded:", formWidgets.length);
console.log("Total themes loaded:", themesList.length);