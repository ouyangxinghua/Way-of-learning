const moment = require("moment");

/**
 * Generate banner with file name and build time
 */
module.exports = function addInfoAboutBuildTime(module) {
    let fileLabel = module
        ? `/*  File: ${module.basename} `
        : "";
    let buildTimeLabel = `/*  Build time: ${moment().format("DD.MM.YY HH:mm:ss")} `;

    let maxSymbolsInLabel = Math.max(fileLabel.length, buildTimeLabel.length) + 3;
    let bordersLabel = `/${new Array(maxSymbolsInLabel - 2).fill("*").join("")}/`;

    fileLabel += new Array(maxSymbolsInLabel - 2 - fileLabel.length).fill(" ").join("") + "*/";
    buildTimeLabel += new Array(maxSymbolsInLabel - 2 - buildTimeLabel.length).fill(" ").join("") + "*/";

    let strings = module
        ? [bordersLabel, fileLabel, buildTimeLabel, bordersLabel]
        : [bordersLabel, buildTimeLabel, bordersLabel];

    return strings.join("\n") + "\n";
};
