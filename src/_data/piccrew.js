const fs = require("fs");
const path = require("path");

const PICS_DIR = "src/images/piccrews";
const PUBLIC_PATH = "/images/piccrews";
const EXTS = [".png", ".gif", ".jpg", ".webp"];


function enrich(piccrew) {
  return {
    ...piccrew,
    src: `${PUBLIC_PATH}/${piccrew.image}`,
    alt: piccrew.alt || piccrew.image.replace(/[-_]/g, " ").replace(/\..+$/, ""),
  };
}

function autoPic(file) {
  return {
    image: file,
    src: `${PUBLIC_PATH}/${file}`,
    alt: file.replace(/[-_]/g, " ").replace(/\..+$/, ""),
    url: `https://picrew.me/en/image_maker/${file.replace(/\..+$/, "")}`
  };
}

module.exports = function () {
  const files = fs
    .readdirSync(PICS_DIR)
    .filter((f) => EXTS.includes(path.extname(f).toLowerCase()));

  const piccrew = files.map((file) => autoPic(file));

return files.map((file) => autoPic(file));

};
